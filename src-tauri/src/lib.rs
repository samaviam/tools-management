use std::env;

use auth::token::{generate_token, Claims};
use bcrypt::{hash, DEFAULT_COST};
use dirs::home_dir;
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use migration::{Migrator, MigratorTrait};
use service::{
    sea_orm::{Database, DatabaseConnection},
    Mutation,
    Query
};
use ::entity::users;

pub mod auth {
    pub mod token;
}

#[derive(Clone)]
pub struct AppState {
    conn: DatabaseConnection,
}

async fn initialize_db() -> Result<DatabaseConnection, String> {
    // تعیین مسیر دیتابیس
    let home_dir = home_dir().ok_or("Home directory not found")?;
    let data_dir = home_dir.join(".tools-management/data");

    std::fs::create_dir_all(&data_dir)
        .map_err(|e| format!("Failed to create data dir: {}", e))?;

    // اتصال به دیتابیس
    let db_path = data_dir.join("db.sqlite");
    let db_url = format!("sqlite:{}?mode=rwc", db_path.display());
    
    Database::connect(&db_url)
        .await
        .map_err(|e| format!("Database connection failed: {}", e))
}

async fn run_migrations(conn: &DatabaseConnection) -> Result<(), String> {
    Migrator::up(conn, None)
        .await
        .map_err(|e| format!("Migration failed: {}", e))
}

async fn create_admin_if_needed(conn: &DatabaseConnection, email: String, password: String) -> Result<(), String> {
    // بررسی وجود کاربر admin
    let existing_user = Query::find_user_by_email(conn, &email)
        .await
        .map_err(|e| e.to_string())?;

    if existing_user.is_none() {
        // ایجاد کاربر admin
        let hashed_password = hash(password, DEFAULT_COST)
            .map_err(|e| format!("Hashing failed: {}", e))?;

        let admin_user = users::Model {
            name: "Admin".to_string(),
            email: email.to_string(),
            password: hashed_password,
            ..Default::default()
        };

        Mutation::create_user(&conn, admin_user).await
            .map_err(|e| format!("User creation failed: {}", e))?;
    }

    Ok(())
}

#[tauri::command]
async fn login(email: String, password: String, state: tauri::State<'_, AppState>) -> Result<String, String> {
    match Query::login_user(&state.conn, &email, &password).await {
        Ok(Some(user)) => {
            let token = generate_token(&user.id.to_string()).unwrap();
            Ok(token)
        },
        Ok(None) => Err("Invalid credentials".to_string()),
        Err(_) => Err("Database error".to_string()),
    }
}

#[tauri::command]
async fn get_logged_in_user(token: String, state: tauri::State<'_, AppState>) -> Result<users::Model, String> {
    let secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "mysecret".into());

    let token_data = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::new(Algorithm::HS256),
    )
    .map_err(|e| format!("Invalid token: {}", e))?;

    let user_id = token_data.claims.sub;

    let user_id: i32 = user_id.parse().map_err(|_| "Invalid user ID format".to_string())?;

    let user = Query::find_user_by_id(&state.conn, user_id)
        .await
        .map_err(|e| format!("Database error: {}", e))?
        .ok_or("User not found".to_string())?;

    Ok(user)
}

#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    env::set_var("RUST_LOG", "debug");
    tracing_subscriber::fmt::init();

    dotenvy::dotenv().ok();

    let conn = initialize_db().await.expect("Database initialization failed");

    run_migrations(&conn).await.expect("Migrations failed");

    create_admin_if_needed(
        &conn,
        "admin@example.com".to_string(),
        "admin123".to_string()
    ).await.expect("Admin creation failed");

    let state = AppState { conn };

    tauri::Builder::default()
        .manage(state)
        .plugin(tauri_plugin_sql::Builder::new().build())
        .invoke_handler(tauri::generate_handler![login, get_logged_in_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
