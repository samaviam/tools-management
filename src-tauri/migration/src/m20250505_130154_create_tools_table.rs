use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Tools::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Tools::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Tools::SerialCode).string().not_null())
                    .col(ColumnDef::new(Tools::Name).string().not_null())
                    .col(ColumnDef::new(Tools::Brand).string().null())
                    .col(ColumnDef::new(Tools::Accuracy).string().null())
                    .col(ColumnDef::new(Tools::Range).string().null())
                    .col(ColumnDef::new(Tools::SerialNumber).string().null())
                    .col(ColumnDef::new(Tools::PropertyCode).string().null())
                    .col(ColumnDef::new(Tools::Quantity).integer().null())
                    .col(ColumnDef::new(Tools::Description).string().null())
                    .col(
                        ColumnDef::new(Tools::CreatedAt)
                            .timestamp()
                            .extra("DEFAULT CURRENT_TIMESTAMP".to_string()),
                    )
                    .col(
                        ColumnDef::new(Tools::UpdatedAt)
                            .timestamp()
                            .extra("DEFAULT CURRENT_TIMESTAMP".to_string()),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Tools::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Tools {
    Table,
    Id,
    SerialCode,
    Name,
    Brand,
    Accuracy,
    Range,
    SerialNumber,
    PropertyCode,
    Quantity,
    Description,
    CreatedAt,
    UpdatedAt,
}
