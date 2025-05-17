use ::entity::{users, users::Entity as Users, tools, tools::Entity as Tools};
use bcrypt::verify;
use sea_orm::*;

pub struct Query;

impl Query {
    pub async fn find_user_by_id(db: &DbConn, id: i32) -> Result<Option<users::Model>, DbErr> {
        Users::find_by_id(id).one(db).await
    }

    pub async fn find_user_by_email(
        db: &DbConn,
        email: &str,
    ) -> Result<Option<users::Model>, DbErr> {
        Users::find()
            .filter(users::Column::Email.eq(email))
            .one(db)
            .await
    }

    pub async fn find_users_in_page(
        db: &DbConn,
        page: u64,
        users_per_page: u64,
    ) -> Result<(Vec<users::Model>, u64), DbErr> {
        let paginator = Users::find()
            .order_by_asc(users::Column::CreatedAt)
            .paginate(db, users_per_page);
        let num_pages = paginator.num_pages().await?;

        paginator.fetch_page(page - 1).await.map(|u| (u, num_pages))
    }

    pub async fn find_all_users(db: &DbConn) -> Result<Vec<users::Model>, DbErr> {
        Users::find().order_by_asc(users::Column::Id).all(db).await
    }

    pub async fn login_user(
        db: &DbConn,
        email: &str,
        password: &str,
    ) -> Result<Option<users::Model>, sea_orm::DbErr> {
        if let Some(user) = Users::find()
            .filter(users::Column::Email.eq(email))
            .one(db)
            .await?
        {
            if verify(password, &user.password).unwrap_or(false) {
                Ok(Some(user))
            } else {
                Ok(None)
            }
        } else {
            Ok(None)
        }
    }

    pub async fn find_tool_by_id(db: &DbConn, id: i32) -> Result<Option<tools::Model>, DbErr> {
        Tools::find_by_id(id).one(db).await
    }

    pub async fn find_all_tools(db: &DbConn) -> Result<Vec<tools::Model>, DbErr> {
        Tools::find().order_by_asc(tools::Column::Id).all(db).await
    }
}
