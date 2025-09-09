# Content Editing Guide

This guide explains how to edit and manage content for Hyun Jung Lee's CV/portfolio website. All content is stored in JSON files for easy editing without touching any code.

## 📁 Content Files Location

- **Main CV Data**: `content/profile.json`
- **Publications**: `content/publications.json`
- **Experience**: `content/experience.json`

## 🔧 How to Edit Content

### 1. Basic Editing Process

1. Open the relevant JSON file in any text editor (VS Code, Notepad++, etc.)
2. Make your changes following the format described below
3. Save the file
4. Refresh your browser to see changes
5. The system will show an error if your JSON is invalid

### 2. JSON Validation

The system automatically validates your content when the page loads. If there's an error:
- Check the browser console for detailed error messages
- Common issues: missing commas, unmatched quotes, missing required fields
- Use a JSON validator like jsonlint.com if needed

## 📝 Publications (`content/publications.json`)

### Structure
```json
{
  "publications": [
    {
      "id": "unique-identifier-2024",
      "slug": "url-friendly-title-without-spaces",
      "title": "Your Paper Title",
      "authors": ["Author 1", "Author 2", "Author 3"],
      "year": 2024,
      "venue": "Conference or Journal Name",
      "type": "journal|conference|workshop|preprint",
      "venue_type": "MICCAI|ICML|IEEE TMI|Nature|Other",
      "equal_contrib": [0, 1],
      "impact_factor": "10.6",
      "citation_count": 45,
      "abstract": "Full abstract text...",
      "keywords": ["keyword1", "keyword2"],
      "links": [
        {
          "type": "pdf|doi|arxiv|code|website|bibtex",
          "url": "https://example.com/link",
          "label": "Display Name"
        }
      ],
      "notes": "Additional notes or recognition"
    }
  ]
}
```

### Field Descriptions

**Required Fields:**
- `id`: Unique identifier (use format: title-keywords-year)
- `slug`: URL-friendly version of title (lowercase, hyphens only)
- `title`: Paper title
- `authors`: Array of author names
- `year`: Publication year
- `venue`: Conference or journal name
- `type`: One of: journal, conference, workshop, preprint
- `links`: Array of resource links

**Optional Fields:**
- `venue_type`: For badge display (MICCAI, ICML, IEEE TMI, etc.)
- `equal_contrib`: Array of author indices (0-based) who contributed equally
- `impact_factor`: Journal impact factor
- `citation_count`: Number of citations
- `abstract`: Full abstract text
- `keywords`: Array of keywords
- `notes`: Additional notes or awards

### Link Types
- `pdf`: Direct PDF link
- `doi`: DOI link
- `arxiv`: arXiv link
- `code`: GitHub or code repository
- `website`: Project website
- `bibtex`: BibTeX file

### Adding a New Publication

1. Copy an existing publication entry
2. Generate a unique `id` (e.g., "new-paper-title-2024")
3. Create a `slug` from the title (lowercase, replace spaces with hyphens)
4. Fill in all required fields
5. Add optional fields as needed
6. Ensure proper JSON syntax (commas, quotes)

## 💼 Experience (`content/experience.json`)

### Structure
```json
{
  "experiences": [
    {
      "id": "unique-id-2023",
      "slug": "role-organization-year",
      "organization": "Company/Institution Name",
      "role": "Job Title",
      "location": "City, Country",
      "start_date": "2023-03",
      "end_date": "2024-01",
      "supervisor": "Supervisor Name",
      "description": "Brief role description",
      "bullets": [
        "Key responsibility or achievement 1",
        "Key responsibility or achievement 2"
      ],
      "achievements": [
        "Major achievement 1",
        "Major achievement 2"
      ],
      "technologies": ["Python", "TensorFlow", "Docker"],
      "team_size": 12,
      "budget": "$2.5M annually"
    }
  ]
}
```

### Field Descriptions

**Required Fields:**
- `id`: Unique identifier
- `slug`: URL-friendly identifier
- `organization`: Company or institution name
- `role`: Job title
- `start_date`: Start date (YYYY-MM format)
- `bullets`: Array of key responsibilities

**Optional Fields:**
- `end_date`: End date (omit for current positions)
- `location`: Work location
- `supervisor`: Supervisor name
- `description`: Role overview
- `achievements`: Array of major achievements
- `technologies`: Array of technologies used
- `team_size`: Number of team members
- `budget`: Budget managed

### Date Format
Use `YYYY-MM` format for dates:
- `"2023-03"` for March 2023
- Omit `end_date` for current positions (shows "Present")

## 👤 Main Profile (`content/profile.json`)

This file contains the main CV data displayed on the homepage. Key sections:

### Personal Information
```json
{
  "name": "Full Name",
  "role": "Professional Title",
  "location": "City, Country",
  "profile_summary": "Professional summary paragraph..."
}
```

### Contacts
```json
{
  "contacts": [
    {
      "type": "email|phone|linkedin|website|address",
      "value": "contact.value@example.com",
      "url": "https://optional-custom-url.com",
      "label": "Display Label"
    }
  ]
}
```

### Skills and Additional Data
```json
{
  "skills": ["Skill 1", "Skill 2"],
  "awards": ["Award Name - Year"],
  "languages": ["English (Fluent)", "Korean (Native)"]
}
```

## 🖼️ Adding Images

### Profile Photos
1. Add image files to a web-accessible location
2. Update the `avatar` field in `profile.json`:
   ```json
   "avatar": "https://example.com/photo.jpg"
   ```

### Image Requirements
- **Format**: JPG, PNG, WebP
- **Size**: Recommended 200x200px for avatars
- **Location**: Use external URLs or upload to image hosting

## 🎨 Styling and Fonts

### Google Fonts
The site uses Inter font by default. To change fonts:
1. Add font link to `index.html` head section:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
   ```
2. Update font configuration in design system files

### Color Themes
- The site supports automatic dark/light mode
- Colors are defined in the design system
- Print styles are optimized for academic CVs

## ⚠️ Common Issues and Troubleshooting

### JSON Syntax Errors
- **Missing comma**: Each object property except the last needs a comma
- **Unmatched quotes**: All strings must be in double quotes
- **Invalid characters**: Avoid smart quotes, use straight quotes only

### Validation Errors
- **Required fields**: All required fields must be present
- **Date format**: Use YYYY-MM format for dates
- **URL format**: Links must be valid URLs starting with http/https
- **Array format**: Arrays must use square brackets `[]`

### Testing Your Changes
1. Save the JSON file
2. Refresh the webpage
3. Check browser console (F12) for any errors
4. Validation errors will show detailed messages

## 🔧 Advanced Features

### Auto-Generated Slugs
Slugs are automatically generated from titles:
- Converts to lowercase
- Replaces spaces with hyphens
- Removes special characters
- Example: "Deep Learning Paper" → "deep-learning-paper"

### Equal Contribution Marking
For publications with equal contribution:
```json
"equal_contrib": [0, 1]
```
This marks the first and second authors (0-indexed) with "*"

### Citation Formatting
The system automatically formats citations in academic style:
- Author list with equal contribution markers
- Venue and year formatting
- Impact factors and citation counts when provided

## 📞 Getting Help

If you encounter issues:
1. Check the browser console for detailed error messages
2. Validate your JSON syntax using online tools
3. Compare your entries with existing working examples
4. Ensure all required fields are present and correctly formatted

Remember: The system validates all content and will show specific error messages to help you fix any issues.