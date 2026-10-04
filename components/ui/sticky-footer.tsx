import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import { InstagramIcon } from 'lucide-react';
import { Button } from './button';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
	return (
		<footer
			className={cn('relative h-[720px] w-full', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="fixed bottom-0 h-[720px] w-full">
				<div className="sticky top-[calc(100vh-720px)] h-full overflow-y-auto">
					<div className="relative flex size-full flex-col justify-between gap-5 border-t px-4 py-8 md:px-12">
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict"
						>
							<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
						</div>
						<div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0">
							<AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-red-800 text-amber-300 font-bold border border-amber-400">結</div>
									<div>
										<h3 className="text-lg font-bold text-white">JAPANESE CLUB</h3>
										<p className="text-xs text-amber-300">日本語部 • 絆と記録</p>
									</div>
								</div>
								<p className="text-muted-foreground mt-4 text-sm">
									Arsip kebersamaan, cerita santai, dan keseruan nongkrong circle Japanese Club.
								</p>
								<div className="flex gap-2">
									{socialLinks.map((link) => (
										<Button key={link.title} asChild size="icon" variant="outline" className="size-9 rounded-lg border-amber-400/30 text-amber-300 hover:border-amber-400 hover:text-white">
											<a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
												<link.icon className="size-4" />
											</a>
										</Button>
									))}
								</div>
							</AnimatedContainer>
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									key={group.label}
									delay={0.1 + index * 0.1}
									className="w-full"
								>
									<div className="mb-10 md:mb-0">
										<h3 className="text-sm font-semibold tracking-wider text-amber-400 uppercase">{group.label}</h3>
										<ul className="text-muted-foreground mt-4 space-y-2 text-sm md:text-xs lg:text-sm">
											{group.links.map((link) => (
												<li key={link.title}>
													<a
														href={link.href}
														className="hover:text-amber-300 inline-flex items-center transition-all duration-300"
													>
														{link.icon && <link.icon className="me-1 size-4" />}
														{link.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}
						</div>
						<div className="text-muted-foreground flex flex-col items-center justify-between gap-2 border-t pt-2 text-sm md:flex-row">
							<p>© 2024 - 2026 Japanese Club (日本語部). All rights reserved.</p>
							<p className="text-amber-400">ありがとう、この仲間に出会えて</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

const socialLinks = [
	{ title: 'Instagram', href: 'https://www.instagram.com/_jikoo0ol/', icon: InstagramIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'Eksplorasi',
		links: [
			{ title: 'Beranda Utama', href: '#beranda' },
			{ title: 'Kisah Circle', href: '#tentang' },
			{ title: 'Anak-anak Circle', href: '#anggota' },
			{ title: 'Kotowaza Hari Ini', href: '#pepatah' },
			{ title: 'Arsip Galeri', href: '#galeri' },
			{ title: 'Papan Kesan', href: '#pesan' },
		],
	},
	{
		label: 'The Squad',
		links: [
			{ title: 'Yasha (Ketua)', href: '#anggota' },
			{ title: 'Alex (Wakil)', href: '#anggota' },
			{ title: 'Ilma (Bendahara)', href: '#anggota' },
			{ title: 'Mail (Ketua Divisi)', href: '#anggota' },
			{ title: 'Sigit (Anggota)', href: '#anggota' },
			{ title: 'Shafira, Amel, Zahwa, Kevin', href: '#anggota' },
		],
	},
	{
		label: 'Interaksi',
		links: [
			{ title: '3D Coverflow Galeri', href: '#galeri' },
			{ title: 'BGM Lofi Player', href: 'javascript:void(0)' },
			{ title: 'Maskot Chibi', href: 'javascript:void(0)' },
			{ title: 'Acak Pepatah Jepang', href: 'javascript:void(0)' },
			{ title: 'JICALL Room', href: '#tentang' },
		],
	},
	{
		label: 'Member Area',
		links: [
			{ title: 'VIP Dashboard', href: 'dashboard.html' },
			{ title: 'Masuk Akun Circle', href: 'javascript:void(0)' },
			{ title: 'Buka Kunci Galeri', href: '#galeri' },
			{ title: 'Tulis Cerita Baru', href: '#pesan' },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}

