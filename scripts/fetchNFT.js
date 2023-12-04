async function main() {
  const endpoint =
    "https://api.studio.thegraph.com/query/60400/chainlinkhackathon/v0.0.1";
  const query = `query fetchQuery {
        newApplicants {
          id
          applicant
          listingID
          profileURL
          
        }
      }`;
  const result = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
    }),
  });
  console.log(result);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
