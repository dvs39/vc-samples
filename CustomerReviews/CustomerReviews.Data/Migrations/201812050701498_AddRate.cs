namespace CustomerReviews.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CustomerReview", "Rate", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CustomerReview", "Rate");
        }
    }
}
