import { socials } from '../utils/constants'

export function Socials({ ...props }) {
  return (
    <div className={`gap-4 flex flex-row ${props.className}`}>
      {socials.map((social) => 
        <a href={social.url} target="_blank" rel="noreferrer" key={social.url}>
          <span>{social.platform}</span>
        </a>
      )}
    </div>
  )
}