using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularBlog.API.Dtos
{
    public class Contact
    {        public string Name { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
