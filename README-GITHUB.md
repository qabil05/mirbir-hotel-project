# MIRBIR — GitHub Pages ready

This package is prepared to publish as a static site on GitHub Pages.

## Publish

1. Create a new GitHub repository.
2. Upload **the contents of this folder** to the repository root.
3. Use `main` as the default branch.
4. Open **Settings → Pages** and make sure the source is **GitHub Actions**.
5. Push/commit to `main`.
6. Open the **Actions** tab and wait for **Deploy MIRBIR to GitHub Pages** to finish.
7. GitHub will show the published Pages URL.

The workflow automatically supports both:
- `https://USERNAME.github.io/REPOSITORY/`
- `https://USERNAME.github.io/` when the repo is named `USERNAME.github.io`

## Custom domain

For a project Pages site using a custom domain at `/`, add a repository variable:

**Settings → Secrets and variables → Actions → Variables → New repository variable**

- Name: `MIRBIR_BASE_PATH`
- Value: `/`

Then run the deployment again.

## Notes

- No Node.js server is required.
- React runtime files are local in `assets/vendor-v6/`.
- All routes are real static folders (`/stay/`, `/experience/`, `/book/`, etc.).
- The design-template disclaimer remains in the footer.
