'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Download01Icon, Cancel01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import ProgrssiveBlur from '../animate/progessive-blur';
import { CodeSnippet } from './code-snippet';
import DownloadIcon from '../icons/download';
import CopyIcon from '../icons/copy';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CodeDrawerProps {
	children: React.ReactNode;
	code: string;
	fileName?: string;
	language?: string;
	side?: 'left' | 'right';
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function CodeDrawer({
	children,
	code,
	fileName = 'component.tsx',
	language = 'typescript',
	side = 'left',
	open: controlledOpen,
	onOpenChange,
}: CodeDrawerProps): React.ReactElement {
	const [internalOpen, setInternalOpen] = React.useState<boolean>(false);
	const isOpen: boolean = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const setIsOpen: (open: boolean) => void = onOpenChange || setInternalOpen;
	const [copied, setCopied] = React.useState<boolean>(false);

	const handleCopy = async (): Promise<void> => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout((): void => setCopied(false), 2000);
	};

	const handleDownload = (): void => {
		const blob = new Blob([code], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<div onClick={() => setIsOpen(true)}>{children}</div>

			<AnimatePresence>
				{isOpen && (
					<>
						{/* Mobile backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='fixed inset-0 bg-black/50 z-50 lg:hidden'
							onClick={(): void => setIsOpen(false)}
						/>

						{/* Drawer */}
						<motion.div
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%', filter: 'blur(4px)' }}
							transition={{ ease: 'easeInOut', duration: 0.3 }}
							className={cn(
								'fixed lg:z-10 flex flex-col h-dvh',
								// Mobile: drawer from bottom with padding
								'bottom-0 z-50 left-0 right-0 max-h-[85vh] rounded-t-3xl',
								// Desktop: fixed split panel
								'lg:top-0 lg:bottom-auto lg:max-h-none lg:h-dvh lg:rounded-3xl lg:p-3 lg:w-[calc(50%-3rem)]',
								side === 'left' ? 'lg:left-20 lg:right-auto' : 'lg:left-auto lg:right-0'
							)}
						>
							<div className='flex flex-col h-full bg-muted rounded-t-3xl lg:rounded-3xl overflow-hidden'>
								{/* Header */}
								<div className='flex items-center justify-between  px-4 py-3 lg:px-6 lg:py-4 shrink-0'>
									<div className='flex items-center gap-2'>
										<h2 className='text-sm font-light'>Source Code</h2>
									</div>
									<div className='flex items-center gap-1 lg:gap-2'>
										<Tooltip>
											<TooltipTrigger asChild>
												<button
													onClick={handleCopy}
													className={cn(
														'flex items-center justify-center rounded-md p-2 group transition-colors hover:bg-background/20 relative',
														copied ? 'text-green-600' : ''
													)}
													title='Copy code'
												>
													<span className='sr-only'>Copy code</span>
													<AnimatePresence mode='popLayout'>
														{copied ? (
															<motion.div
																key='tick'
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																exit={{ opacity: 0, filter: 'blur(6px)' }}
																transition={{ duration: 0.3, ease: 'easeInOut' }}
															>
																<HugeiconsIcon
																	icon={Tick02Icon}
																	size={16}
																	strokeWidth={1.5}
																	className='text-primary'
																/>
															</motion.div>
														) : (
															<motion.div
																key='copy'
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																exit={{ opacity: 0, filter: 'blur(4px)' }}
																transition={{ duration: 0.3, ease: 'easeInOut' }}
															>
																<CopyIcon className='group-hover:text-primary transition-all duration-300 text-muted-foreground size-4 stroke-[1.5] relative' />
															</motion.div>
														)}
													</AnimatePresence>
												</button>
											</TooltipTrigger>
											<TooltipContent>
												<p>{copied ? 'Copied!' : 'Copy code'}</p>
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<button
													onClick={handleDownload}
													className='flex items-center justify-center rounded-md p-2 group transition-colors hover:bg-background/20'
													title='Download code'
												>
													<span className='sr-only'>Download code</span>
													<DownloadIcon className='group-hover:text-primary transition-all duration-300 text-muted-foreground size-4 stroke-[1.5]' />
												</button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Download code</p>
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<button
													onClick={(): void => setIsOpen(false)}
													className='flex items-center justify-center rounded-md p-2 group transition-colors hover:bg-background/20 '
													title='Close'
												>
													<span className='sr-only'>Close</span>
													<HugeiconsIcon
														icon={Cancel01Icon}
														size={16}
														strokeWidth={1.5}
														className='group-hover:text-primary transition-all duration-300 text-muted-foreground group-hover:rotate-90 rotate-0 ease-in-out'
													/>
												</button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Close</p>
											</TooltipContent>
										</Tooltip>
									</div>
								</div>

								{/* Code Content */}
								<div className=' p-4 lg:p-6  relative h-full lg:pt-0 pt-0'>
									{' '}
									<ProgrssiveBlur
										backgroundColor='var(--secondary)'
										position='top'
										height='30px'
									/>
									<div className='flex-1 overflow-auto h-full '>
										<CodeSnippet
											code={code}
											language={language}
										/>
									</div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
