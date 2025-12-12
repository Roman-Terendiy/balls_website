# Namecheap Git Deployment Guide

## ✅ Repository Status

- ✅ `.cpanel.yml` file created and committed
- ✅ All changes committed and pushed to GitHub
- ✅ Repository: https://github.com/Roman-Terendiy/balls_website

## 🚀 How to Deploy from cPanel

### Step 1: Access Git Version Control in cPanel

1. Log into your **Namecheap cPanel**
2. Find **"Git Version Control"** or **"Git"** section
3. Click on it

### Step 2: Create/Configure Repository

If you haven't set up the repository yet:

1. Click **"Create"** or **"Add Repository"**
2. Fill in the details:
   - **Repository URL:** `https://github.com/Roman-Terendiy/balls_website.git`
   - **Repository Branch:** `main`
   - **Deployment Path:** `public_html` (or leave default)
   - **Repository Name:** `balls_website` (optional)

3. Click **"Create"**

### Step 3: Deploy/Pull Changes

Once the repository is configured:

1. You should see your repository listed
2. Click **"Deploy"** or **"Pull or Deploy"** button
3. Wait for the deployment to complete

The system will:
- Pull latest code from GitHub
- Execute commands from `.cpanel.yml`
- Install dependencies
- Build the project

### Step 4: Check Deployment Status

After clicking Deploy:
- The "Last Deployment Information" should update
- You should see:
  - Last Deployed on: (date/time)
  - Last Deployed SHA: (commit hash)
  - Author: (your name)
  - Commit Date: (date)

## 🔧 Troubleshooting

### If "Not available" still shows:

**Option 1: Manual Pull**
1. In Git Version Control, find your repository
2. Click **"Pull or Deploy"** manually
3. Wait for completion

**Option 2: Check Repository Settings**
1. Make sure the repository URL is correct
2. Verify branch is set to `main`
3. Ensure deployment path is `public_html`

**Option 3: Check .cpanel.yml Syntax**
- The file should be at the root of your repository
- Verify it's committed and pushed to GitHub

**Option 4: Check File Permissions**
- Make sure cPanel has permission to access the repository
- Check that SSH keys are set up if using SSH URL

### If Deployment Fails:

1. **Check Logs:**
   - Look for deployment logs in cPanel
   - Check error messages

2. **Verify Node.js:**
   - Make sure Node.js is installed on your hosting
   - Check Node.js version (should be 18+)

3. **Check npm Path:**
   - The `.cpanel.yml` tries both `/usr/local/bin/npm` and `/bin/npm`
   - You may need to adjust paths based on your server

## 📋 Post-Deployment Steps

After successful deployment:

1. **Set Environment Variables:**
   - Go to cPanel → Environment Variables
   - Add: `BOT_TOKEN`, `CHAT_ID`, `NODE_ENV`, `PORT`

2. **Configure Node.js App:**
   - Go to cPanel → Node.js Selector
   - Create app with `server.js` as startup file
   - Set mode to Production

3. **Test Your Site:**
   - Visit `https://volleyballsfun.site`
   - Test the form submission

## 🔄 Updating Your Site

After making changes to your code:

1. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Deploy in cPanel:**
   - Go to Git Version Control
   - Click "Pull or Deploy" on your repository
   - Wait for deployment to complete

## ⚠️ Important Notes

- The `.cpanel.yml` automatically runs `npm install --production` and `npm run build`
- Make sure `.next` folder is NOT in `.gitignore` for deployment (actually, it should be rebuilt on server)
- Background images should be in the `public/` folder
- Environment variables must be set separately in cPanel

## 📞 Still Having Issues?

If deployment still shows "Not available":
1. Try creating the repository again
2. Check cPanel error logs
3. Contact Namecheap support with:
   - Repository URL
   - Error messages (if any)
   - Screenshot of Git Version Control page

