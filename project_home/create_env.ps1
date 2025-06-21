$content = @"
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_API_BASE_PATH=/auth

# Student Domain Configuration (should match backend)
NEXT_PUBLIC_STUDENT_DOMAIN=emsi-etu.ma

# Development flags
NEXT_PUBLIC_DEV_MODE=true
"@

Set-Content -Path ".env.local" -Value $content 