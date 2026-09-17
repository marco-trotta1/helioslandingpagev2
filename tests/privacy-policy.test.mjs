import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const readSiteFile = (name) => readFileSync(fileURLToPath(new URL(`../${name}`, import.meta.url)), 'utf8');

test('links both legal pages from the quote notice and footer', () => {
  const landing = readSiteFile('index.html');
  const privacyLinks = landing.match(/href="privacy\.html"/g) ?? [];
  const termsLinks = landing.match(/href="terms\.html"/g) ?? [];

  assert.equal(privacyLinks.length, 2);
  assert.equal(termsLinks.length, 2);
  assert.match(landing, /By requesting a quote, you agree to our <a href="privacy\.html">Privacy Policy<\/a> and <a href="terms\.html">Terms &amp; Conditions<\/a>\./);
  assert.match(landing, /<footer>[\s\S]*?<a\b[^>]*href="privacy\.html"[^>]*>Privacy<\/a>/);
  assert.match(landing, /<footer>[\s\S]*?<a\b[^>]*href="terms\.html"[^>]*>Terms<\/a>/);
});

test('publishes the current privacy policy', () => {
  const policy = readSiteFile('privacy.html');

  assert.match(policy, /<title>Privacy Policy \| Irrigant<\/title>/);
  assert.match(policy, /Effective date: September 16, 2026/);
  assert.match(policy, /website, Helios, Ask Helios, and Text Helios/i);
  assert.match(policy, /Account and contact information/i);
  assert.match(policy, /Farm and field information/i);
  assert.match(policy, /DeepSeek API/i);
  assert.match(policy, /People's Republic of China/i);
  assert.match(policy, /Twilio and mobile carriers/i);
  assert.match(policy, /90-day retention period/i);
  assert.match(policy, /henry@irrigant\.xyz/);
  assert.match(policy, /terms\.html/);
  assert.match(policy, /We do not sell personal information or disclose it to third parties for their own advertising campaigns/i);
  assert.doesNotMatch(policy, /Formspree/i);
  assert.doesNotMatch(policy, /<script\b/i);
});

test('publishes the terms and conditions', () => {
  const terms = readSiteFile('terms.html');

  assert.match(terms, /<title>Terms &amp; Conditions \| Irrigant<\/title>/);
  assert.match(terms, /Effective date: September 16, 2026/);
  assert.match(terms, /These terms govern your use of Irrigant's website/i);
  assert.match(terms, /Irrigant does not guarantee crop yield/i);
  assert.match(terms, /##? SMS Terms|SMS Terms/);
  assert.match(terms, /Reply STOP to unsubscribe/i);
  assert.match(terms, /href="privacy\.html"/);
  assert.match(terms, /henry@irrigant\.xyz/);
  assert.doesNotMatch(terms, /<script\b/i);
});
