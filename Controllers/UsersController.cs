using ConnectApi.DTO;
using ConnectApi.Models;
using ConnectApi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace ConnectApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class UsersController : ControllerBase
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly IConfiguration config;

		private readonly IConversationRepository conversationRepository;
		public UsersController(UserManager<ApplicationUser> userManager, IConfiguration config, IConversationRepository conversationRepository)
		{
			_userManager = userManager;
			this.config = config;
			this.conversationRepository = conversationRepository;
		}

		[HttpPost("Register")]
		public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
		{
			var user = new ApplicationUser
			{
				UserName = dto.Username,
				Email = dto.Email,
				//ProfileImageUrl = dto.ProfileImageUrl // optional: add this to your DTO
			};

			var result = await _userManager.CreateAsync(user, dto.Password);

			if (result.Succeeded)
			{
				return Ok(new { message = "User created successfully" });
			}

			return BadRequest(result.Errors);
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginDTO dto)
		{
			if (ModelState.IsValid)
			{
				var user = await _userManager.FindByNameAsync(dto.Username);
				if (user != null && await _userManager.CheckPasswordAsync(user, dto.Password))
				{
					var claims = new List<Claim>
					{
						new Claim(ClaimTypes.Name, dto.Username),
						new Claim(ClaimTypes.NameIdentifier, user.Id),
						new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
					};

					SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]));
					SigningCredentials signincred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

					JwtSecurityToken mytoken = new JwtSecurityToken(
						issuer: config["JWT:ValidIssuer"],
						audience: config["JWT:ValidAudiance"],
						claims: claims,
						expires: DateTime.UtcNow.AddDays(1),
						signingCredentials: signincred
					);

					
			

					return Ok(new
					{
						token = new JwtSecurityTokenHandler().WriteToken(mytoken),
						expiration = mytoken.ValidTo,
						user = new
						{
							user.Id,
							user.UserName,
							user.Email,
							user.ProfileImageUrl
						}
					});
				}

				return Unauthorized();
			}

			return Unauthorized();
		}

		[HttpGet("UsersConvertedWith")]
		public async Task<IActionResult> GetUsersConvertedWith(string userId)
		{

			if (string.IsNullOrEmpty(userId))
				return BadRequest("UserId is required");


			var conversations = await conversationRepository.GetConversationUsersWith(userId);


			

			var userIds = conversations.SelectMany(c => new[] {c.User1Id,c.User2Id}).Where(id =>  id != userId).Distinct().ToList();


			



			var users = await _userManager.Users.Where(u => userIds.Contains(u.Id))
				.Select(u => new
				{
					u.Id,
					u.UserName,
					u.Email,
					u.PhoneNumber,
					u.ProfileImageUrl
				})
				.ToListAsync();


			

			return Ok(users);
		}


		[HttpGet("GetAllUsers")]

		public async Task<IActionResult> GetAllUsers()
		{


			var users = await _userManager.Users
				.Select(u => new
				{
					u.Id,
					u.UserName,
					u.Email,
					u.PhoneNumber,
					u.ProfileImageUrl
				})
				.ToListAsync();




			return Ok(users);
		}

		[HttpPost("AddImage")]
		
		public async Task<IActionResult> AddImage([FromForm] UploadImageDTO dto)
		{
			if (dto.ProfileImageUrl == null || dto.ProfileImageUrl.Length == 0)
				return BadRequest(new { message = "No file uploaded." });

			var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
			var ext = Path.GetExtension(dto.ProfileImageUrl.FileName).ToLower();
			if (!allowedExtensions.Contains(ext))
				return BadRequest(new { message = "Invalid file type." });

			var fileName = $"{Guid.NewGuid()}{ext}";
			var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "profiles");
			if (!Directory.Exists(folderPath))
				Directory.CreateDirectory(folderPath);

			var filePath = Path.Combine(folderPath, fileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await dto.ProfileImageUrl.CopyToAsync(stream);
			}

			var user = await _userManager.FindByIdAsync(dto.UserId);
			if (user == null)
				return NotFound(new { message = "User not found." });

			user.ProfileImageUrl = $"/images/profiles/{fileName}";
			await _userManager.UpdateAsync(user);

			return Ok(new { message = "Profile image uploaded successfully", imageUrl = user.ProfileImageUrl });
		}


	}
}
