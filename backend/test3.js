import dns from "dns";

console.log(dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.lkbainw.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error("ERROR:", err);
    } else {
      console.log(addresses);
    }
  }
);