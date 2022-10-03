/**
 * Could be cool to have a utility to store all relevant Dao info on chain...
 */

import { TWITTER_HANDLE } from "./env-vars"

export const entries = {
  "mirror": 'https://mirror.xyz/',
  "twitter": `https://twitter.com/${TWITTER_HANDLE}`,
  "discord": 'https://discord.com/'
}

/**
 * Use to convert list to array:
 */

export const socials = Object.keys(entries).map((key) => {
  return {
    'platform': key,
    'url': entries[key as keyof typeof entries]
  }
})
