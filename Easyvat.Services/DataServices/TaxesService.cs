using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Http;
using System.Configuration;
using Easyvat.Model.Models;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Easyvat.Common.Model;
using Easyvat.Common.Resources;
using Microsoft.AspNetCore.Hosting;
using Easyvat.Common.Config;

namespace Easyvat.Services.DataServices
{
    public class TaxesService
    {
        readonly TaxConfiguration taxConfiguration;
        private readonly IHostingEnvironment env;
        public TaxesService(TaxConfiguration taxConfiguration,IHostingEnvironment env)
        {
            this.taxConfiguration = taxConfiguration;
            this.env = env;
        }

        public async Task<PurchaseResponse> ConnectTaxes(cInputData data)
        {

            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            PurchaseResponse result = new PurchaseResponse();

            string URL = taxConfiguration.ServiceUrl;

            HttpClient client = new HttpClient
            {
                BaseAddress = new Uri(URL)
            };

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//המרת אוביקט לגיסון           

            try
            {

                var response = await client.PostAsync(URL, new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"));

                if (!response.IsSuccessStatusCode)  //אם החיבור לשעם נכשל
                {//todo:write to log;
                    throw new Exception(AppMessage.TaxConnectMessage,new Exception("connection error to sham service!"));
                }
                else
                {
                    var rd = response.Content.ReadAsStringAsync().Result;
                    var getData = JsonConvert.DeserializeObject<PurchaseResponse>(rd);
                    result = getData;

                }

            }
            catch (Exception e)  //אם החיבור לשעם נכשל
            {
                throw new Exception(AppMessage.TaxConnectMessage, e);

            }

            return result;
        }
    }
}
