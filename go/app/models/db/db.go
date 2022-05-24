package db

import (
    "os"
    "database/sql"
    "fmt"
    "log"

    _ "github.com/mattn/go-sqlite3"

	"mercari-build-training-2022/app/config"
)

var DbConnection *sql.DB

func init() {
    var err error
	log.Printf(os.Getenv("ENV"))
    if env := os.Getenv("ENV"); env == "test" {
        DbConnection, err = sql.Open(config.Config.SQLDriver, config.Config.TestDbName)
    } else {
        DbConnection, err = sql.Open(config.Config.SQLDriver, config.Config.DbName)
    }
    if err != nil {
        log.Fatalln(err)
    }
    // CREATE DB TABLE
    cmd := fmt.Sprintf(`
		CREATE TABLE IF NOT EXISTS [items] (
			id INTEGER PRIMARY KEY NOT NULL,
			name STRING,
			category STRING,
			image STRING
        )`)
    _, err = DbConnection.Exec(cmd)
	if err != nil {
		log.Fatalln(err)
	}
}