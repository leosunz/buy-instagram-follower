type Props = {
  readonly plan: any
}
import NextImage from 'next/image'
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
// import { Image } from '@/components/atoms/Image'
export const PlanConfirmation: React.VFC<Props> = (props) => {
  const [instagramName, setInstagramName] = useState('')
  const [email, setEmail] = useState('')
  const [pictureUrl, setPictureUrl] = useState('/img/instaPicture.png')
  const [loaded, setLoaded] = useState(false)

  const submitPlan = () => {}
  // const getPhoto = async () => {
  // }

  useEffect(() => {
    setTimeout(() => {
      setPictureUrl(`https://instagram.com/${instagramName}/media`)
      //  https://instagram.com/[USER_ID]/media
    }, 100)
  }, [instagramName])
  return (
    <div className="flex flex-col flex-wrap w-full pb-24 bg-[#222232]">
      <div className="flex flex-col flex-wrap mt-16 md:mt-8 w-full md:flex-row md:flex-nowrap md:space-x-3 text-white">
        <div className="flex w-full items-center justify-center">
          <NextImage
            src={loaded === true ? pictureUrl : '/img/instaPicture.png'}
            width="150px"
            height="150px"
            alt="Insta Picture"
            quality={100}
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>
        <div className="flex w-full">
          <div className="flex flex-col flex-wrap w-full px-10 py-5">
            <div className="w-full p-3">
              <input
                className="w-full text-black"
                type="text"
                name="insta-name"
                placeholder="Your Instagram Name"
                onChange={(e) => setInstagramName(e.target.value)}
                value={instagramName}
              ></input>
            </div>
            <div className="w-full p-3">
              <input
                className="w-full text-black"
                type="text"
                name="email"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>
            <div className="flex mt-5 w-full justify-center items-center">
              <span className="text-3xl text-[white]">
                Price:{' '}
                <span className="text-pink-700 text-3xl">
                  $ {props.plan.cost}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col flex-wrap w-full p-5">
            <div className="flex">
              <ReCAPTCHA
                size="normal"
                sitekey="6Lch5RkeAAAAAEkgDosw1pfb_1yNR7Ko4oCUgz_A"
              />
            </div>
            <div className="flex items-center justify-center p-10 md:p-5">
              <span className="py-3 px-10 w-full bg-[#f1601c] rounded-3xl text-center cursor-pointer">
                Buy Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
