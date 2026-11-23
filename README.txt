DISETO LOOKBOOK — INSTALLATION

1. Extract this ZIP in the root of your Next.js project (merge the public and components folders).
2. The photos will be placed in:
   public/images/lookbook/
3. Import the component in app/page.jsx:
   import Lookbook from "@/components/Lookbook";
4. Render it where you want the Lookbook section to appear:
   <Lookbook />
   Recommended: after <Projects /> or replace the old Projects section if that is your intention.
5. The CTA links to /#contact. Make sure your contact section has id="contact".

Notes:
- The gallery uses the uploaded photos, categorized by their upload order:
  10 kitchens, 2 wardrobes, 1 commercial/showroom photo.
- Project names are intentionally generic placeholders. Replace them when you have confirmed project names/details.
- This component uses React state and styled-jsx, so it is a Client Component.
