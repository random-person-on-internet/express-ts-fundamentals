package main

import (
	"testing"

	"go.mongodb.org/atlas-sdk/v20231115003/admin"
)

func TestMockedError(t *testing.T) {
	apiError := admin.GenericOpenAPIError{}
	apiError.SetModel(admin.ApiError{
		Detail:    admin.PtrString("Error when listing clusters"),
		Error:     admin.PtrInt(400),
		ErrorCode: admin.PtrString("CLUSTERS_UNREACHABLE"),
		Reason:    admin.PtrString("Clusters unreachable"),
	})
	apiError.SetError("Mocked error")

	err := error(&apiError)

	// test parsing the error
	if parsedErr, ok := admin.AsError(err); ok {
		if parsedErr.GetError() != 400 {
			t.Errorf("Expected 400 error, got %v", parsedErr.GetError())
		}
		if parsedErr.GetErrorCode() != "CLUSTERS_UNREACHABLE" {
			t.Errorf("Expected error code CLUSTERS_UNREACHABLE, got %s", parsedErr.GetErrorCode())
		}
	} else {
		t.Error("Failed to cast mock error to admin.AsError")
	}
}
