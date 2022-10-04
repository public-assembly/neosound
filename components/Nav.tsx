import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const pages = [
  {
    slug: '/',
    title: 'Listen',
  },
  {
    slug: '/curate',
    title: 'Curate',
  },
  {
    slug: '/deploy',
    title: 'Deploy',
  },
  {
    slug: '/about',
    title: 'About',
  },
]

export function Nav(): JSX.Element {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* DESKTOP NAV */}
      <div className="hidden sm:flex flex-row gap-4">
        {pages.map((page) => (
          <Link passHref href={page.slug} key={page.slug}>
            <button
              className={`${
                router.asPath === page.slug ? 'ns-nav__item_current' : 'ns-nav__item'
              }`}>
              {page.title}
            </button>
          </Link>
        ))}
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
        <div className="sm:hidden text-6xl font-semibold  absolute inset-0 ns-mobile__menu h-screen   flex flex-col justify-center z-50">
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
            <div key={page.slug} className="flex flex-col gap-y-12">
              <Link passHref href={page.slug}>
                <button
                  className={`${
                    router.asPath === page.slug
                      ? 'ns-nav__mobile_item_current'
                      : 'ns-nav__mobile_item'
                  } mt-4`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {page.title}
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
