using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ConnectApi.Models
{
	public class ITIEntity : IdentityDbContext<ApplicationUser>
	{

		public ITIEntity() { }

		public ITIEntity(DbContextOptions options) : base(options) {
			

		
		}

		public DbSet<Employee> Employees { get; set; }
		public DbSet<Message> Messages { get; set; }

		public DbSet<Conversation> Conversations { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			// Configure Message entity relationships
			builder.Entity<Message>()
				.HasOne(m => m.Sender)
				.WithMany() // optional: you can add .WithMany(u => u.SentMessages)
				.HasForeignKey(m => m.SenderId)
				.OnDelete(DeleteBehavior.Restrict); // avoid cascade delete

			builder.Entity<Message>()
				.HasOne(m => m.Receiver)
				.WithMany() // optional: you can add .WithMany(u => u.ReceivedMessages)
				.HasForeignKey(m => m.ReceiverId)
				.OnDelete(DeleteBehavior.Restrict);

			builder.Entity<Message>()
	         .HasOne(m => m.Conversation)
	         .WithMany(c => c.Messages)
	         .HasForeignKey(m => m.ConversationId)
	         .OnDelete(DeleteBehavior.Cascade);

			builder.Entity<Conversation>()
	         	.HasOne(c => c.User1)
	          	.WithMany()
	         	.HasForeignKey(c => c.User1Id)
	         	.OnDelete(DeleteBehavior.Restrict); // ⚠️ changed from Cascade

			builder.Entity<Conversation>()
				.HasOne(c => c.User2)
				.WithMany()
				.HasForeignKey(c => c.User2Id)
				.OnDelete(DeleteBehavior.Restrict);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=WebApiMonofiaQ4;Integrated Security=True;TrustServerCertificate=True;");
			base.OnConfiguring(optionsBuilder);
		}
	}
}
