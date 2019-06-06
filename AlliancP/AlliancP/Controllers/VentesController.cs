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
using AlliancP.Models;

namespace AlliancP.Controllers
{
    public class VentesController : ApiController
    {
        private AllianceDBEntities db = new AllianceDBEntities();

        // GET: api/Ventes
        public IQueryable<Vente> GetVente()
        {
            return db.Vente;
        }

        // GET: api/Ventes/5
        [ResponseType(typeof(Vente))]
        public IHttpActionResult GetVente(int id)
        {
            Vente vente = db.Vente.Find(id);
            if (vente == null)
            {
                return NotFound();
            }

            return Ok(vente);
        }

        // PUT: api/Ventes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVente(int id, Vente vente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vente.venteID)
            {
                return BadRequest();
            }

            db.Entry(vente).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VenteExists(id))
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

        // POST: api/Ventes
        [ResponseType(typeof(Vente))]
        public IHttpActionResult PostVente(Vente vente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Vente.Add(vente);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vente.venteID }, vente);
        }

        // DELETE: api/Ventes/5
        [ResponseType(typeof(Vente))]
        public IHttpActionResult DeleteVente(int id)
        {
            Vente vente = db.Vente.Find(id);
            if (vente == null)
            {
                return NotFound();
            }

            db.Vente.Remove(vente);
            db.SaveChanges();

            return Ok(vente);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VenteExists(int id)
        {
            return db.Vente.Count(e => e.venteID == id) > 0;
        }
    }
}