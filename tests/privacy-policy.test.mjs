import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const readSiteFile = (name) => readFileSync(fileURLToPath(new URL(`../${name}`, import.meta.url)), 'utf8');

test('links the privacy policy from the collection notice and footer', () => {
  const landing = readSiteFile('index.html');
  const privacyLinks = landing.match(/href="privacy\.html"/g) ?? [];

  assert.equal(privacyLinks.length, 2);
  assert.match(landing, /By requesting a quote, you agree to our <a href="privacy\.html">Privacy Policy<\/a>\./);
  assert.match(landing, /<footer>[\s\S]*?<a\b[^>]*href="privacy\.html"[^>]*>Privacy<\/a>/);
});

test('states the policy scope and privacy request route', () => {
  const policy = readSiteFile('privacy.html');

  assert.match(policy, /<title>Privacy Policy \| Irrigant<\/title>/);
  assert.match(policy, /Effective date: June 21, 2026/);
  assert.match(policy, /information submitted through the Helios quote request/i);
  assert.match(policy, /When you request a quote, we collect/i);
  assert.match(policy, /manage your quote request and communicate with you about Helios/i);
  assert.match(policy, /Formspree processes quote requests for us/i);
  assert.match(policy, /retain quote request information only as long as reasonably needed/i);
  assert.match(policy, /first name, last name, email address, farm-size range, crop types, and location/i);
  assert.match(policy, /Formspree/i);
  assert.match(policy, /Google Fonts/i);
  assert.match(policy, /do not sell your personal information or share it for cross-context behavioral advertising/i);
  assert.match(policy, /marcotrotta909@gmail\.com/);
  assert.doesNotMatch(policy, /waitlist/i);
  assert.doesNotMatch(policy, /<script\b/i);
});
