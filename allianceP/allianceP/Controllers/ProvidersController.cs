using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using allianceP.Models;

namespace allianceP.Controllers
{
    public class ProvidersController : ApiController
    {
        private storeDBModel db = new storeDBModel();

        // GET: api/Providers
        public IQueryable<Providers> GetProviders()
        {
            return db.Providers;
        }

        // GET: api/Providers/5
        [ResponseType(typeof(Providers))]
        public IHttpActionResult GetProviders(int id)
        {
            Providers providers = db.Providers.Find(id);
            if (providers == null)
            {
                return NotFound();
            }

            return Ok(providers);
        }

        // PUT: api/Providers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProviders(int id, Providers providers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != providers.providerID)
            {
                return BadRequest();
            }

            db.Entry(providers).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvidersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Providers
        [ResponseType(typeof(Providers))]
        public IHttpActionResult PostProviders(Providers providers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Providers.Add(providers);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ProvidersExists(providers.providerID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = providers.providerID }, providers);
        }

        // DELETE: api/Providers/5
        [ResponseType(typeof(Providers))]
        public IHttpActionResult DeleteProviders(int id)
        {
            Providers providers = db.Providers.Find(id);
            if (providers == null)
            {
                return NotFound();
            }

            db.Providers.Remove(providers);
            db.SaveChanges();

            return Ok(providers);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProvidersExists(int id)
        {
            return db.Providers.Count(e => e.providerID == id) > 0;
        }
    }
}