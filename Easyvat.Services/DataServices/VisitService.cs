using Easyvat.Model.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Easyvat.Services.DataServices
{
    public class VisitService
    {
        private readonly EasyvatContext ctx;
        public VisitService(EasyvatContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task AddVisit(Visit visit)
        {
            ctx.Visits.Add(visit);

            await ctx.SaveChangesAsync();
        }

        public async Task<Visit> GetMemberVisit(Guid? memberId)
        {
            try
            {
                return await ctx.Visits.Where(x => x.MemberId == memberId).OrderByDescending(y => y.CreatedDateTime).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
