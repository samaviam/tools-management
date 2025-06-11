use std::env;
use auth::token::{generate_token, Claims};
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use tauri_plugin_prevent_default::Flags;

pub mod auth {
    pub mod token;
}

#[tauri::command]
async fn login(user_id: i32) -> Result<String, String> {
    let token = generate_token(&user_id.to_string())
        .map_err(|e| format!("Token generation failed: {}", e))?;
    Ok(token)
}

#[tauri::command]
async fn get_logged_in_user(token: String) -> Result<i32, String> {
    let secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "mysecret".into());

    let token_data = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::new(Algorithm::HS256),
    )
    .map_err(|e| format!("Invalid token: {}", e))?;

    let user_id = token_data.claims.sub;

    let user_id: i32 = user_id
        .parse()
        .map_err(|_| "Invalid user ID format".to_string())?;

    Ok(user_id)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    env::set_var("RUST_LOG", "debug");

    dotenvy::dotenv().ok();

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(
            tauri_plugin_prevent_default::Builder::new().with_flags(Flags::all()).build()
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![login, get_logged_in_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
