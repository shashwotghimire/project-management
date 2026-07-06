import assert from "assert";
import { superAdminMiddleware } from "../middlewares/superadmin.middleware";
import { ApiError } from "../helpers/ApiError";

const mockRequest = (userRole?: string) => {
  return {
    user: userRole ? { id: "user-id", email: "test@example.com", role: userRole } : undefined
  } as any;
};

const mockResponse = () => {
  return {} as any;
};

const runTests = async () => {
  console.log("Running Super Admin Tests...");

  // Test 1: superAdminMiddleware allows superadmin
  {
    const req = mockRequest("superadmin");
    const res = mockResponse();
    let nextCalled = false;
    const next = (err?: any) => {
      assert.strictEqual(err, undefined);
      nextCalled = true;
    };
    superAdminMiddleware(req, res, next);
    assert.strictEqual(nextCalled, true, "superAdminMiddleware should call next for superadmin");
    console.log("✓ Test 1: superAdminMiddleware allows superadmin passed");
  }

  // Test 2: superAdminMiddleware blocks regular user
  {
    const req = mockRequest("user");
    const res = mockResponse();
    let errorPassed: any = null;
    const next = (err?: any) => {
      errorPassed = err;
    };
    superAdminMiddleware(req, res, next);
    assert.ok(errorPassed instanceof ApiError, "superAdminMiddleware should pass ApiError to next");
    assert.strictEqual(errorPassed.statusCode, 403);
    assert.strictEqual(errorPassed.message, "Forbidden");
    console.log("✓ Test 2: superAdminMiddleware blocks regular user passed");
  }

  // Test 3: superAdminMiddleware blocks anonymous user
  {
    const req = mockRequest(undefined);
    const res = mockResponse();
    let errorPassed: any = null;
    const next = (err?: any) => {
      errorPassed = err;
    };
    superAdminMiddleware(req, res, next);
    assert.ok(errorPassed instanceof ApiError, "superAdminMiddleware should pass ApiError to next");
    assert.strictEqual(errorPassed.statusCode, 403);
    console.log("✓ Test 3: superAdminMiddleware blocks anonymous user passed");
  }

  console.log("All tests passed successfully!");
};

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
