﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularBlog.API.Models;
using AngularBlog.API.Dtos;

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
            var article = await _context.Article.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // PUT: api/Articles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }

            _context.Entry(article).State = EntityState.Modified;

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
            _context.Article.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticle", new { id = article.Id }, article);
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

        private bool ArticleExists(int id)
        {
            return _context.Article.Any(e => e.Id == id);
        }
    }
}
