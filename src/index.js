/**
 * Made by yrenum 
 */

// port 80 is for HTTP 
const server = Deno.listen({ port: 80});
console.log(`The server is running at http://localhost`);


for await (const conn of server) 
    handle(conn)

  

async function handle(conn) {

    const httpConn = Deno.serveHttp(conn);

    for await (const requestEvent of httpConn) {
        //this is the path part of the url requested
        const url =new URL(requestEvent.request.url).pathname;

        //responding with a static HTML
        const file = await Deno.readFile(`./static/${url}.html`)

        requestEvent.respondWith(
            new Response(file, {
                status: 200,
                headers: {
                    "content-type":"text/html; charset=utf-8"
                }
            }),

        )
    }
}