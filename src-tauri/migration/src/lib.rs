pub use sea_orm_migration::prelude::*;

mod m20250414_111301_create_users_table;
mod m20250505_130154_create_tools_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250414_111301_create_users_table::Migration),
            Box::new(m20250505_130154_create_tools_table::Migration),
        ]
    }
}
