
"use strict";

try {
    var pseudo_random_ISBN_generator = () => {
        let memo_str = '';
        for (let iterator = 0; iterator <= 12; iterator++) {
            memo_str += String(Math.floor(Math.random() * 10));
            if (
                (iterator === 2) ||
                (iterator === 3) ||
                (iterator === 6) ||
                (iterator === 11)
            ) memo_str += '-';
        };
        return (
            String(memo_str)
        );
    };
} catch (err) {
    if (err) console.log(err);
};

try {

    require("http").createServer((req, res) => {


        if (require("url").parse(req.url, true).query.initialized === "true") {

            require("mongodb").MongoClient.connect("mongodb://localhost:27017/", (err, db) => {
                if (err) throw err;
                db.db("tryout_db").createCollection("books_collection", (err, rslt) => {
                    if (err) throw err;
                    db.close();
                });
                db.db("tryout_db").collection("books_collection").insertMany([
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "A Walk By Sand Trees", author: "Bukekele Mengva"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Moonlight Wall", author: "Frederick Oline"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Before Big Bangs", author: "Jeffrey Khajyti"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "After Vacuum", author: "Alan Von Wolfram"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Misinterpretation And The Bug", author: "Andrew Owens"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Boogie & Skating Woogie", author: "Osvald Carti"
                    }
                ], (err, rslt) => {
                    if (err) throw err;
                    db.close();
                });
            });

            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="author" content="dodo --> jozef.javorsky.strom44zem88@gmail.com" />
                    <meta name="description" content="Node.js & MongoDB Tryout." />
                    <title>eLibrary v0.01</title>
                    <link rel="icon" type="image/x-icon" sizes="16x16" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVDhPzYxBDgAgCMN4Ok9XkqkIBORmD8tAKnETEeiZI4hbYQX5YSHvboM8Td2FBWnmpCD1vJmj3yB3K7FCoumD34WEQCi5hEcgNGAeCC/zAVx/7VEAAAAASUVORK5CYII=" />
                    <style>
                        #html-body {
                            background-color: rgb(128, 128, 128);
                            user-select: none;
                        }
                        .hrElement {
                            height: 2mm;
                            width: 12cm;
                            background-color: rgb(0, 0, 0);
                            margin-left: 0;
                            border-radius: 100%;
                        }
                        #header-h3 {
                            margin-left: 2cm;
                            font-family: cursive;
                            text-decoration: overline underline;
                        }
                        #main-nav {
                            margin-left: 1.3cm;
                            display: inline-block;
                            border: 1mm solid rgba(222, 222, 222, 1);
                            border-radius: 3mm;
                            background-color: rgb(30, 30, 30);
                            padding: 2mm 2mm 2mm 2mm;
                        }
                        .crudBttn {
                            border: 2mm solid rgba(0, 0, 0, 1);
                            background-color: rgb(200, 100, 200);
                            color: rgba(0, 0, 0, 1);
                            font-family: cursive;
                            font-weight: 900;
                            font-size: 4.4mm;
                            border-radius: 3mm;
                            padding: 1mm 2mm 1mm 2mm;
                            margin: 0.1mm 1mm 0.1mm 1mm;
                        }
                    </style>
                </head>
                <body id="html-body">
                        <hr class="hrElement" />
                            <header>
                                <h3 id="header-h3">&nbsp;/ eLibrary v0.01 /&nbsp;</h3>
                            </header>
                        <hr class="hrElement" />
                            <main>
                                <nav id="main-nav">
                                    <button class="crudBttn">add</button>
                                    <button class="crudBttn">details</button>
                                    <button class="crudBttn">edit</button>
                                    <button class="crudBttn">remove</button>
                                </nav>
                            </main>
                        <hr class="hrElement" />
                        <script>
                            "use strict";
                            try {
                                var node_bttns = document.querySelectorAll(".crudBttn");
                            } catch (err) {
                                if (err) console.log(err);
                            };
                            try {
                                node_bttns.forEach(n_b => {
                                    n_b.addEventListener("mouseenter", (ev) => {
                                        ev.target.style.cursor = "pointer";
                                        ev.target.style.borderColor = "rgba(200, 100, 200, 1)";
                                        ev.target.style.color = "rgba(200, 100, 200, 1)";
                                        ev.target.style.backgroundColor = "rgb(0, 0, 0)";
                                        ev.target.parentElement.style.backgroundColor = "rgb(222, 222, 222)";
                                        ev.target.parentElement.style.borderColor = "rgba(30, 30, 30, 1)";
                                    });
                                    n_b.addEventListener("mouseleave", (ev) => {
                                        ev.target.style.borderColor = "rgba(0, 0, 0, 1)";
                                        ev.target.style.color = "rgba(0, 0, 0, 1)";
                                        ev.target.style.backgroundColor = "rgb(200, 100, 200)";
                                        ev.target.parentElement.style.backgroundColor = "rgb(30, 30, 30)";
                                        ev.target.parentElement.style.borderColor = "rgba(222, 222, 222, 1)";
                                    });
                                });
                            } catch (err) {
                                if (err) console.log(err);
                            };
                        </script>
                </body>
                </html>
                `
            );
            res.end();


        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="author" content="dodo --> jozef.javorsky.strom44zem88@gmail.com" />
                    <meta name="description" content="Node.js & MongoDB Tryout." />
                    <title>eLibrary v0.01</title>
                    <link rel="icon" type="image/x-icon" sizes="16x16" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVDhPzYxBDgAgCMN4Ok9XkqkIBORmD8tAKnETEeiZI4hbYQX5YSHvboM8Td2FBWnmpCD1vJmj3yB3K7FCoumD34WEQCi5hEcgNGAeCC/zAVx/7VEAAAAASUVORK5CYII=" />
                    <style>
                        #html-body {
                            background-color: rgb(128, 128, 128);
                            user-select: none;
                        }
                        .hrElement {
                            height: 2mm;
                            width: 12cm;
                            background-color: rgb(0, 0, 0);
                            margin-left: 0;
                            border-radius: 100%;
                        }
                        #header-h3 {
                            margin-left: 2cm;
                            font-family: cursive;
                            text-decoration: overline underline;
                        }
                    </style>
                </head>
                <body id="html-body">
                        <hr class="hrElement" />
                            <header>
                                <h3 id="header-h3">&nbsp;/ eLibrary v0.01 /&nbsp;</h3>
                            </header>
                        <hr class="hrElement" />
                            <main>
                                <button id="main-bttn">firstly : initialize books database</button>
                            </main>
                        <hr class="hrElement" />
                        <script>
                            "use strict";
                            try {
                                var only_bttn = document.querySelector("#main-bttn");
                            } catch (err) {
                                if (err) console.log(err);
                            };
                            try {
                                only_bttn.style.marginLeft = "3cm";
                                only_bttn.style.border = '0';
                                only_bttn.style.backgroundColor = "rgb(0, 0, 0)";
                                only_bttn.style.color = "rgba(122, 244, 122, 1)";
                                only_bttn.style.padding = "1mm 2mm 1mm 2mm";
                                only_bttn.style.borderRadius = "1cm";
                                only_bttn.style.fontFamily = "cursive";
                                only_bttn.style.fontWeight = "900";
                            } catch (err) {
                                if (err) console.log(err);
                            };
                            try {
                                only_bttn.addEventListener("mouseenter", (ev) => {
                                    ev.target.style.cursor = "pointer";
                                    ev.target.style.backgroundColor = "rgb(122, 244, 122)";
                                    ev.target.style.color = "rgba(0, 0, 0, 1)";
                                });
                            } catch (err) {
                                if (err) console.log(err);
                            };
                            try {
                                only_bttn.addEventListener("mouseleave", (ev) => {
                                    ev.target.style.backgroundColor = "rgb(0, 0, 0)";
                                    ev.target.style.color = "rgba(122, 244, 122, 1)";
                                });
                            } catch (err) {
                                if (err) console.log(err);
                            };
                            try {
                                only_bttn.addEventListener("click", () => {
                                    window.location = "\\?initialized=true";
                                });
                            } catch (err) {
                                if (err) console.log(err);
                            };
                        </script>
                </body>
                </html>
                `
            );
            res.end();

        };

    }).listen(5500);

} catch (err) {
    if (err) console.log(err);
};