import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CurateModal } from './CurateModal'

const pages = [
  {
    slug: '/',
    title: 'Listen',
    type: 'internal',
  },
  {
    slug: '/curate',
    title: 'Curate',
    type: 'internal',
  },
  {
    slug: 'https://deploy.neosound.xyz/',
    title: 'Deploy',
    type: 'external',
  },
  {
    slug: '/about',
    title: 'About',
    type: 'internal',
  },
]

export default function Nav(): JSX.Element {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* DESKTOP NAV */}
      <div className="hidden flex-row gap-4 sm:flex">
        <Link passHref href={`/`}>
          <a
            className={`${
              router.asPath === '/' ? 'ns-nav__item_current' : 'ns-nav__item'
            }`}>
            Listen
          </a>
        </Link>
        <CurateModal trigger={<span className="ns-nav__item">Curate</span>} />
        <a
          href="https://deploy.neosound.xyz/"
          target="_blank"
          rel="noreferrer"
          className="ns-nav__item">
          Deploy
        </a>
        <Link passHref href={`/about`}>
          <a
            className={`${
              router.asPath === '/about' ? 'ns-nav__item_current' : 'ns-nav__item'
            }`}>
            About
          </a>
        </Link>
      </div>
      <div className="block sm:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Image
            src={'/neosound-icons/mobileMenu/mobileMenu-open.svg'}
            alt="Menu open"
            width={32}
            height={32}
          />
        </button>
      </div>
      {/* MOBILE NAV */}
      {mobileMenuOpen && (
        <div className="ns-mobile__menu absolute inset-0 z-50 flex h-screen flex-col justify-center pb-24 text-6xl font-semibold sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="fixed top-2 left-6">
            <Image
              src={'/neosound-icons/mobileMenu/mobileMenu-close.svg'}
              alt="Menu close"
              width={32}
              height={32}
            />
          </button>
          {pages.map((page) => (
            <div className="flex w-full justify-center" key={page.slug}>
              {page.type === 'internal' ? (
                <Link passHref href={page.slug}>
                  <a
                    className={`py-3 text-center ${
                      router.asPath === page.slug
                        ? 'ns-nav__mobile_item_current'
                        : 'ns-nav__mobile_item'
                    }`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {page.title}
                  </a>
                </Link>
              ) : (
                <a
                  href={page.slug}
                  target="_blank"
                  rel="noreferrer"
                  className={`ns-nav__mobile_item py-3 text-center`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {page.title}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
