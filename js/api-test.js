// AgenticLearn API Test - Verifikasi Koneksi Backend
import { apiClient } from "./api-client.js";

// Test functions
async function testHealthCheck() {
    console.log("🏥 Testing health check...");
    try {
        const response = await apiClient.healthCheck();
        console.log("✅ Health check successful:", response);
        return true;
    } catch (error) {
        console.error("❌ Health check failed:", error);
        return false;
    }
}

async function testGetCourses() {
    console.log("📚 Testing get courses...");
    try {
        const response = await apiClient.getCourses();
        console.log("✅ Get courses successful:", response);
        return true;
    } catch (error) {
        console.error("❌ Get courses failed:", error);
        return false;
    }
}

async function testAriaChat() {
    console.log("🤖 Testing ARIA chat...");
    try {
        const response = await apiClient.ariaChat("Hello, can you help me?");
        console.log("✅ ARIA chat successful:", response);
        return true;
    } catch (error) {
        console.error("❌ ARIA chat failed:", error);
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log("🧪 Starting AgenticLearn API Tests...");
    console.log("🌐 Backend URL:", apiClient.baseURL);
    
    const results = {
        health: await testHealthCheck(),
        courses: await testGetCourses(),
        aria: await testAriaChat()
    };
    
    const passed = Object.values(results).filter(r => r).length;
    const total = Object.keys(results).length;
    
    console.log(`\n📊 Test Results: ${passed}/${total} passed`);
    console.log("🌱 Carbon footprint:", apiClient.getCarbonFootprint());
    
    if (passed === total) {
        console.log("🎉 All tests passed! Backend integration successful!");
    } else {
        console.log("⚠️ Some tests failed. Check backend deployment.");
    }
    
    return results;
}

// Export for use in other files
export { testHealthCheck, testGetCourses, testAriaChat, runAllTests };

// Auto-run tests if loaded directly
if (typeof window !== 'undefined') {
    window.AgenticLearnAPITest = {
        runAllTests,
        testHealthCheck,
        testGetCourses,
        testAriaChat
    };
    
    console.log("🧪 AgenticLearn API Test loaded. Run window.AgenticLearnAPITest.runAllTests() to test.");
}
