import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Menu } from '@headlessui/react'
import React from 'react'
import { FaLanguage } from 'react-icons/fa'

const Navbar = (): JSX.Element => {
	const { t, i18n } = useTranslation()

	return (
		<div className="w-full text-xm bg-[#262A2B] text-white cursor-pointer h-14">
			<Link href="/" passHref>
				<a className="float-left p-4">
					<a>{t('Home')}</a>
				</a>
			</Link>
			<Link href="/create" passHref>
				<a className="float-left p-4">{t('Create countdown')}</a>
			</Link>
			<Link href="https://github.com/filiptronicek/CountDowner" passHref>
				<a className="float-left p-4" target="_blank" rel="noreferrer noopener">
					{t('Source code')}
				</a>
			</Link>

			<Menu>
				<Menu.Button className="float-right p-2 mr-2" as="a">
					<FaLanguage size={38} />
				</Menu.Button>
				<Menu.Items className="shadow-custom absolute bg-white text-blue-500 rounded-xl p-4 right-16 top-4 flex flex-col">
					{Object.keys(i18n.services.resourceStore.data).map((language) => {
						return (
							<Menu.Item
								as="div"
								className="py-1.5 hover:text-green-400 cursor-pointer"
								key={language}
								onClick={() => {
									i18n.changeLanguage(language)
								}}
							>
								{language}
							</Menu.Item>
						)
					})}
				</Menu.Items>
			</Menu>
		</div>
	)
}

export default Navbar
