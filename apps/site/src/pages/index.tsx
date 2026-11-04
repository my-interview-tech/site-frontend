import { useLayoutEffect } from 'react'

import { Specialties } from '@my-interview/common'

import { MainScreen } from '@widgets/main-screen'
import { HomeDownload } from '@widgets/home-download'
import { HomeFaq } from '@widgets/home-faq'
import { HomeFeatures } from '@widgets/home-features'
import { HomePricing } from '@widgets/home-pricing'

import { featureToggles } from '@shared/config'
import { sectionPinPx } from '@shared/constants'
import { useSectionSnap } from '@shared/hooks'

/**
 * Главная: каталог специальностей и секции лендинга по флагам.
 */
const HomePage = () => {
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1)
    const node = id ? document.getElementById(id) : null

    if (!node) {
      return
    }

    window.scrollTo(0, window.scrollY + node.getBoundingClientRect().top - sectionPinPx)
  }, [])

  // включение магнитной прокрутки секции на главной.
  useSectionSnap(featureToggles.main.snap)

  return (
    <>
      {featureToggles.main.carousel && <MainScreen />}
      {featureToggles.main.specialties && <Specialties />}
      {featureToggles.main.features && <HomeFeatures />}
      {featureToggles.main.pricing && <HomePricing />}
      {featureToggles.main.faq && <HomeFaq />}
      {featureToggles.main.download && <HomeDownload />}
    </>
  )
}

export default HomePage
