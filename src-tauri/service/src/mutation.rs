use ::entity::{tools, tools::Entity as Tools, users, users::Entity as Users};
use sea_orm::{sqlx::types::chrono::Utc, *};

pub struct Mutation;

impl Mutation {
    pub async fn create_user(
        db: &DbConn,
        form_data: users::Model,
    ) -> Result<users::ActiveModel, DbErr> {
        users::ActiveModel {
            name: Set(form_data.name.to_owned()),
            email: Set(form_data.email.to_owned()),
            password: Set(form_data.password.to_owned()),
            created_at: Set(Utc::now().into()),
            updated_at: Set(Utc::now().into()),
            ..Default::default()
        }
        .save(db)
        .await
    }

    pub async fn update_user_by_id(
        db: &DbConn,
        id: i32,
        form_data: users::Model,
    ) -> Result<users::Model, DbErr> {
        let user: users::ActiveModel = Users::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find user.".to_owned()))
            .map(Into::into)?;

        users::ActiveModel {
            id: user.id,
            name: Set(form_data.name.to_owned()),
            email: Set(form_data.email.to_owned()),
            password: Set(form_data.password.to_owned()),
            updated_at: Set(Utc::now().into()),
            ..user
        }
        .update(db)
        .await
    }

    pub async fn delete_user(db: &DbConn, id: i32) -> Result<DeleteResult, DbErr> {
        let user: users::ActiveModel = Users::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find user.".to_owned()))
            .map(Into::into)?;

        user.delete(db).await
    }

    pub async fn delete_all_users(db: &DbConn) -> Result<DeleteResult, DbErr> {
        Users::delete_many().exec(db).await
    }

    pub async fn create_tools_batch(
        db: &DbConn,
        tools_data: Vec<tools::Model>,
    ) -> Result<InsertResult<tools::ActiveModel>, DbErr> {
        let now = Utc::now().into();

        let active_models: Vec<tools::ActiveModel> = tools_data
            .into_iter()
            .map(|tool| tools::ActiveModel {
                serial_code: Set(tool.serial_code),
                name: Set(tool.name),
                brand: Set(tool.brand),
                accuracy: Set(tool.accuracy),
                range: Set(tool.range),
                serial_number: Set(tool.serial_number),
                property_code: Set(tool.property_code),
                quantity: Set(tool.quantity),
                description: Set(tool.description),
                created_at: Set(now),
                updated_at: Set(now),
                ..Default::default()
            })
            .collect();

        Tools::insert_many(active_models).exec(db).await
    }
}
