BACKGROUND IMAGE INSTRUCTIONS
==============================

This project supports separate background images for mobile and desktop devices.

MOBILE IMAGE:
1. Place your mobile background image in this folder (public/)
2. Name it: ball-background-mobile.jpg
3. Recommended size: 1080x1920px (portrait orientation)
4. This image will be used on devices smaller than 768px width

DESKTOP IMAGE:
1. Place your desktop background image in this folder (public/)
2. Name it: ball-background-desktop.jpg
3. Recommended size: 1920x1080px (landscape orientation)
4. This image will be used on devices 768px width and larger

SUPPORTED FORMATS:
- JPG
- PNG
- WebP

To use different filenames or breakpoint:
- Edit app/page.module.css
- Find the .container class for mobile image
- Find @media (min-width: 768px) for desktop image
- Update the file paths and/or min-width value as needed

