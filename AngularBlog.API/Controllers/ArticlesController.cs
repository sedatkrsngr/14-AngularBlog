﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularBlog.API.Models;
using AngularBlog.API.Dtos;
using System.Threading;
using System.Globalization;
using System.IO;

namespace AngularBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly BlogDbContext _context;

        public ArticlesController(BlogDbContext context)
        {
            _context = context;
        }


        // GET: api/Articles/1/10  //sayfalama için manuel oluşturduk
        [HttpGet("{page}/{pageSize}")]
        public ActionResult GetArticle(int page = 1, int pageSize = 5)
        {
            try
            {
                IQueryable<Article> query;
                query = _context.Article.Include(x => x.Category).Include(y => y.Comment).OrderByDescending(o => o.PublishDate);

                int totalCount = query.Count();//Sayfalama yapacağımız zaman kaç tane veri var bilmeliyiz.

                //skip gelen parametre kadar veri atla demek
                //sayfa 2 page 10 olduğunda 5*1=5 yani 5 veriyi atla take ile de gelen n veriyi al demek yani ilk 5 veriden sonraki n veriyi getir
                var articlesResponse = query.Skip((pageSize * (page - 1))).Take(pageSize).ToList().Select(x => new ArticleResponse()
                {
                    Id = x.Id,
                    Title = x.Title,
                    ContentMain = x.ContentMain,
                    ContentSummary = x.ContentSummary,
                    Picture = x.Picture,
                    PublishDate = x.PublishDate,
                    CommentCount = x.Comment.Count(),
                    ViewCount = x.ViewCount,
                    Category = new CategoryResponse()
                    {
                        Id = x.Category.Id,
                        Name = x.Category.Name
                    }
                });

                var result = new
                {
                    TotalCount = totalCount,
                    Articles = articlesResponse
                };//geriye kendi verdiğimiz değerleri dönen varsayılan nesne olşturduk

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        // GET: api/Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticle()
        {
            return await _context.Article.ToListAsync();
        }


        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _context.Article.Include(x => x.Category).Include(y => y.Comment).FirstOrDefaultAsync(z => z.Id == id);

            if (article == null)
            {
                return NotFound();
            }
            ArticleResponse articleResponse = new ArticleResponse()
            {
                Id = article.Id,
                Title = article.Title,
                ContentMain = article.ContentMain,
                ContentSummary = article.ContentSummary,
                Picture = article.Picture,
                PublishDate = article.PublishDate,
                ViewCount = article.ViewCount,
                Category = new CategoryResponse() { Id = article.Category.Id, Name = article.Category.Name },
                CommentCount = article.Comment.Count

            };


            return Ok(articleResponse);
        }

        [HttpGet]
        [Route("GetArticlesWithCategory/{categoryId}/{page}/{pageSize}")]
        public IActionResult GetArticlesWithCategory(int categoryId, int page = 1, int pageSize = 5)
        {
            IQueryable<Article> query = _context.Article.Include(x => x.Category).Include(y => y.Comment).Where(z => z.CategoryId == categoryId).OrderByDescending(x => x.PublishDate);

            int totalCount = query.Count();//Sayfalama yapacağımız zaman kaç tane veri var bilmeliyiz.

            var articlesResponse = query.Skip((pageSize * (page - 1))).Take(pageSize).ToList().Select(x => new ArticleResponse()
            {
                Id = x.Id,
                Title = x.Title,
                ContentMain = x.ContentMain,
                ContentSummary = x.ContentSummary,
                Picture = x.Picture,
                PublishDate = x.PublishDate,
                CommentCount = x.Comment.Count(),
                ViewCount = x.ViewCount,
                Category = new CategoryResponse()
                {
                    Id = x.Category.Id,
                    Name = x.Category.Name
                }
            });

            var result = new
            {
                TotalCount = totalCount,
                Articles = articlesResponse
            };//geriye kendi verdiğimiz değerleri dönen varsayılan nesne olşturduk

            return Ok(result);
        }


        [HttpGet]
        [Route("SearchArticles/{searchText}/{page}/{pageSize}")]
        public IActionResult SearchArticles(string searchText, int page = 1, int pageSize = 5)
        {
            IQueryable<Article> query;

            query = _context.Article.Include(x => x.Category).Include(y => y.Comment).Where(z => z.Title.Contains(searchText)).OrderByDescending(f => f.PublishDate);

            int totalCount = query.Count();//Sayfalama yapacağımız zaman kaç tane veri var bilmeliyiz.

            var articlesResponse = query.Skip((pageSize * (page - 1))).Take(pageSize).ToList().Select(x => new ArticleResponse()
            {
                Id = x.Id,
                Title = x.Title,
                ContentMain = x.ContentMain,
                ContentSummary = x.ContentSummary,
                Picture = x.Picture,
                PublishDate = x.PublishDate,
                CommentCount = x.Comment.Count(),
                ViewCount = x.ViewCount,
                Category = new CategoryResponse()
                {
                    Id = x.Category.Id,
                    Name = x.Category.Name
                }
            });

            var result = new
            {
                TotalCount = totalCount,
                Articles = articlesResponse
            };//geriye kendi verdiğimiz değerleri dönen varsayılan nesne olşturduk

            return Ok(result);
        }
        [HttpGet]
        [Route("GetArticlesByMostView")]
        public IActionResult GetArticlesByMostView()
        {
            System.Threading.Thread.Sleep(2000);
            var articles = _context.Article.OrderByDescending(x => x.ViewCount).Take(5).Select(x => new ArticleResponse()
            {
                Title = x.Title,
                Id = x.Id
            });

            return Ok(articles);
        }
        [HttpGet]
        [Route("GetArticlesArchive")]
        public IActionResult GetArticlesArchive()
        {
            var culture = CultureInfo.CreateSpecificCulture("tr-TR");
            System.Threading.Thread.Sleep(1000);
            var query = _context.Article.GroupBy(x => new { x.PublishDate.Year, x.PublishDate.Month }).Select(y =>
                 new
                 {
                     year = y.Key.Year,
                     month = y.Key.Month,
                     count = y.Count(),
                     monthName = new DateTime(y.Key.Year, y.Key.Month, 1).ToString("MMMM", culture)
                 });

            return Ok(query);
        }

        [HttpGet]
        [Route("GetArticleArchiveList/{year}/{month}/{page}/{pageSize}")]
        public IActionResult GetArticleArchiveList(int year, int month, int page, int pageSize)
        {
            Thread.Sleep(1700);

            IQueryable<Article> query;
            query = _context.Article.Include(x => x.Category).Include(y => y.Comment).Where(z => z.PublishDate.Year == year && z.PublishDate.Month == month).OrderByDescending(f => f.PublishDate);

            int totalCount = query.Count();//Sayfalama yapacağımız zaman kaç tane veri var bilmeliyiz.

            var articlesResponse = query.Skip((pageSize * (page - 1))).Take(pageSize).ToList().Select(x => new ArticleResponse()
            {
                Id = x.Id,
                Title = x.Title,
                ContentMain = x.ContentMain,
                ContentSummary = x.ContentSummary,
                Picture = x.Picture,
                PublishDate = x.PublishDate,
                CommentCount = x.Comment.Count(),
                ViewCount = x.ViewCount,
                Category = new CategoryResponse()
                {
                    Id = x.Category.Id,
                    Name = x.Category.Name
                }
            });

            var result = new
            {
                TotalCount = totalCount,
                Articles = articlesResponse
            };//geriye kendi verdiğimiz değerleri dönen varsayılan nesne olşturduk

            return Ok(result);
        }
        // PUT: api/Articles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, Article article)
        {
            Article firstArticle = _context.Article.Find(id);

            firstArticle.Title = article.Title;
            firstArticle.ContentSummary = article.ContentSummary;
            firstArticle.ContentMain = article.ContentMain;
            firstArticle.CategoryId = article.Category.Id;
            firstArticle.Picture = article.Picture;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Articles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
            if (article.Category != null)
            {
                article.CategoryId = article.Category.Id;
            }
            article.Category = null;
            article.ViewCount = 0;
            article.PublishDate = DateTime.Now;

            _context.Article.Add(article);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await _context.Article.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Article.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [Route("ArticleViewCountUp/{id}")]
        [HttpGet()]
        public IActionResult ArticleViewCountUp(int id)
        {
            Article article = _context.Article.Find(id);
            article.ViewCount += 1;
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost]
        [Route("SaveArticlePicture")]
        public async Task<IActionResult> SaveArticlePicture(IFormFile picture)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(picture.FileName);

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/articlePictures", fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await picture.CopyToAsync(stream);
            };
            var result = new
            {
                path = "https://" + Request.Host + "/articlePictures/" + fileName
            };

            return Ok(result);
        }

        private bool ArticleExists(int id)
        {
            return _context.Article.Any(e => e.Id == id);
        }
    }
}
