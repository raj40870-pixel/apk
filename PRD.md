# PRD: Website to APK Converter using Capacitor WebView Wrapper

## 1. Goal
User koi bhi website URL de → System 20-25 sec me signed APK bana ke download link de. Android Studio nahi chahiye. Pure cloud build InsForge Compute pe.

## 2. Tech Stack & Method
Method: Capacitor WebView Wrapper + Trusted Web Activity logic  
Tools: Node.js 18, @capacitor/cli, OpenJDK 17, Android SDK Commandline Tools, Gradle 8.0  
Build Type: Release APK with signing key. Play Store ready.

## 3. System Architecture Flow
User Input → API Server → Docker Container → Capacitor Build → Signed APK → Cloud Storage → Download Link

## 4. Detailed Step-by-Step Process
Step 1: Input Collection  
API ko ye data milega: `{url: "https://example.com", appName: "MyApp", packageId: "com.user.myapp", iconUrl: "https://...png"}`  
Validation: URL live hai, packageId format `com.domain.app` hai, icon 512x512 PNG hai.

Step 2: Project Init in Container  
Container me `/builds/{jobId}` folder banega.  
Command: `npx @capacitor/cli init`  
Auto generate `capacitor.config.ts`: `{appId: packageId, appName: appName, webDir: 'www', server: {url: url, cleartext: true}}`  
Icon ko `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` me copy karna.

Step 3: Android Project Sync  
Command: `npx cap add android` agar android folder nahi hai  
Command: `npx cap sync android` ye WebView config inject karega  
Time: 3-5 sec kyunki pre-built Android template use hoga

Step 4: Build & Sign  
Pre-installed keystore use hoga `/keys/debug.keystore`  
Command: `cd android && ./gradlew assembleRelease`  
Gradle cache + Android SDK pehle se Docker image me hoga isliye 15-20 sec  
Output: `android/app/build/outputs/apk/release/app-release.apk`

Step 5: Output & Cleanup  
APK ko `/storage/{jobId}.apk` me move karo. 1 hour baad auto delete.  
API response: `{success: true, downloadUrl: "https://storage...apk", size: "9.2MB", buildTime: "23s"}`

## 5. InsForge Deployment Config
Dockerfile: `FROM node:18-bullseye` + `apt-get install openjdk-17-jdk android-sdk-platform-tools` + `npm install -g @capacitor/cli`  
Docker Build Args: Pre-download Android SDK 34, Gradle 8.0, Capacitor Android 5.x. Isse har build me download nahi hoga.  
InsForge Command: `npx @insforge/cli compute deploy ./apk-builder --name apk-builder --cpu shared-2x --memory 4096 --timeout 120`

## 6. Performance Target
Cold build: 45-60 sec. Warm build with cache: 20-25 sec. Target warm cache maintain karna hai.

## 7. Limitations
Ye WebView wrapper hai. Website offline nahi chalegi agar PWA nahi hai. Native plugin chahiye to Capacitor plugin add karna padega. Backend API phone me nahi chalega.

## 8. API Endpoint Spec
POST `/api/build-apk`  
Body: JSON upar wala  
Response: JSON upar wala. Error case: `{success: false, error: "URL not reachable"}`

