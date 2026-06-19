import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv(
  "_mongodb._tcp.cluster0.lkbainw.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error(err);
    } else {
      console.log(addresses);
    }
  }
);