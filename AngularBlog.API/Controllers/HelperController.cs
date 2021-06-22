using AngularBlog.API.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace AngularBlog.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HelperController : ControllerBase
    {
        [HttpPost]
        public IActionResult SendContactEmail(Contact contact)
        {
            System.Threading.Thread.Sleep(5000);
            try
            {
                MailMessage mailMessage = new MailMessage();

                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");

                smtpClient.EnableSsl = true;
                mailMessage.From = new MailAddress("sedatkarasungur4@gmail.com");//giden mailde görünen adres kısmı
                mailMessage.To.Add(contact.Email);//gidecek adres

                mailMessage.Subject = contact.Subject;
                mailMessage.Body = contact.Message;
                mailMessage.IsBodyHtml = true;
                smtpClient.Port = 587;

                smtpClient.Credentials = new System.Net.NetworkCredential("email@gmail.com", "password");//burada doğrulaması kaldırılmış gmail hesabı bilgileri olur. Giden email buradan gönderilecek

                smtpClient.Send(mailMessage);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
