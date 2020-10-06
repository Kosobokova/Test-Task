using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Linq;
using TestApp;
using System.Web.UI.WebControls.WebParts;

namespace TestApp.Controllers
{
	public class TestCRUDController : ApiController
	{
		public HttpResponseMessage Get()
		{
			var result = new HttpResponseMessage();
			{
				using (TestDataBase db = new TestDataBase(@"Data Source=192.168.50.7;Initial Catalog=Test;User Id=DB_USER;Password=jlbyldfnhb"))
				{

					Table<Customers> cust = db.Customers;
					var toresp = cust.ToList();
					result = Request.CreateResponse(HttpStatusCode.OK, toresp);
					var res = result.Content;
				}
			};
			return result;
		}

		public void Post([FromBody] Customers newcustomer)
		{
			Customers cust = newcustomer;
			using (TestDataBase db = new TestDataBase(@"Data Source=192.168.50.7;Initial Catalog=Test;User Id=DB_USER;Password=jlbyldfnhb"))
			{
				db.GetTable<Customers>().InsertOnSubmit(cust);
				db.SubmitChanges();
			}
		}

		public void Put([FromBody] IEnumerable<Customers> newcustomers)
		{
			IEnumerable<Customers> cust = newcustomers;
			using (TestDataBase db = new TestDataBase(@"Data Source=192.168.50.7;Initial Catalog=Test;User Id=DB_USER;Password=jlbyldfnhb"))
			{
				foreach (Customers person in cust)
				{
					var customerQuery =
						from pers in db.Customers
						select pers;

					foreach (var human in customerQuery)
					{
						if (human.Id == person.Id)
						{
							human.FirstName = person.FirstName;
							human.LastName = person.LastName;
							human.Age = person.Age;
							human.Email = person.Email;
							human.Phone = person.Phone;
						}
					}
					db.SubmitChanges();
				}
			}
		}

		public void Delete([FromBody] Customers newcustomer)
		{
			Customers cust = newcustomer;
			using (TestDataBase db = new TestDataBase(@"Data Source=192.168.50.7;Initial Catalog=Test;User Id=DB_USER;Password=jlbyldfnhb"))
			{
				var customerQuery =
						from pers in db.Customers
						where pers.Id == cust.Id
						select pers;

				foreach (var human in customerQuery)
				{
					db.Customers.DeleteOnSubmit(human);
				}

				//db.GetTable<Customers>().DeleteOnSubmit(cust);
				db.SubmitChanges();
			}
		}
	}
}
