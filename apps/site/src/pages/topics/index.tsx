import { Roadmap } from '@my-interview/feature-roadmap'

const TopicsIndexPage = () => <Roadmap topicHref={(slug) => `/topics/${slug}`} />

export default TopicsIndexPage
