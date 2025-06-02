package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/atlas-sdk/v20231115003/admin"
)

func main() {
	_ = godotenv.Load()

	publicKey := os.Getenv("ATLAS_PUBLIC_KEY")
	privateKey := os.Getenv("ATLAS_PRIVATE_KEY")

	if publicKey == "" || privateKey == "" {
		log.Fatal("API keys not set in env")
	}

	// init sdk client
	sdk, err := admin.NewClient(admin.UseDigestAuth(publicKey, privateKey))
	if err != nil {
		log.Fatalf("Failed to initialize Atlas SDK client: %v", err)
	}

	ctx := context.Background()

	// make API call and handle error
	projects, _, err := sdk.ProjectsApi.ListProjects(ctx).Execute()
	if err != nil {
		if apiErr, ok := admin.AsError(err); ok {
			switch apiErr.GetError() {
			case 400:
				log.Printf("Bad request: %v", apiErr.GetDetail())
			case 404:
				log.Printf("Resource not found: %v", apiErr.GetDetail())
			case 500:
				log.Printf("Internal server error: %v", apiErr.GetDetail())
			default:
				log.Printf("Unhandled error: %v", apiErr.GetDetail())
			}

			// specific error code check
			if admin.IsErrorCode(err, "MAXIMUM_INDEXES_FOR_TENANT_EXCEEDED") {
				log.Println("Too many indexes created")
			}
		} else {
			log.Printf("Unknown error: %v", err)
		}
		return
	}

	fmt.Println("Projects fetched:")
	for _, p := range *projects.Results {
		fmt.Printf("- %s (ID: %s) \n", p.Name, *p.Id)
	}

}
