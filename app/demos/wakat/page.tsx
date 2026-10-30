'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, ShieldCheck, Key, FileCode, CheckCircle, 
  ExternalLink, Lock, AlertTriangle, Layers, RefreshCw
} from 'lucide-react'

interface TLVTag {
  tag: number
  name: string
  description: string
  length: number
  value: string
  hexValue: string
  isCrypto?: boolean
}

const ZATCA_TAGS: TLVTag[] = [
  {
    tag: 1,
    name: "Seller's Name",
    description: 'Corporate legal entity registered in Saudi Arabia',
    length: 22,
    value: 'Bottrion Systems LLC',
    hexValue: '42 6f 74 74 72 69 6f 6e 20 53 79 73 74 65 6d 73 20 4c 4c 43',
  },
  {
    tag: 2,
    name: 'VAT Registration Number',
    description: '15-digit ZATCA VAT identifier',
    length: 15,
    value: '310123456700003',
    hexValue: '33 31 30 31 32 33 34 35 36 37 30 30 30 30 33',
  },
  {
    tag: 3,
    name: 'Invoice Timestamp',
    description: 'ISO 8601 UTC timestamp',
    length: 20,
    value: '2026-10-30T10:14:00Z',
    hexValue: '32 30 32 36 2d 31 30 2d 33 30 54 31 30 3a 31 34 3a 30 30 5a',
  },
  {
    tag: 4,
    name: 'Invoice Total (with VAT)',
    description: 'Total monetary payable amount (SAR)',
    length: 8,
    value: '11500.00',
    hexValue: '31 31 35 30 30 2e 30 30',
  },
  {
    tag: 5,
    name: 'VAT Amount',
    description: '15% standard VAT breakdown (SAR)',
    length: 7,
    value: '1500.00',
    hexValue: '31 35 30 30 2e 30 30',
  },
  {
    tag: 6,
    name: 'XML Invoice SHA-256 Hash',
    description: 'Cryptographic digest of canonicalized UBL 2.1 XML',
    length: 32,
    value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    hexValue: 'e3 b0 c4 42 98 fc 1c 14 9a fb f4 c8 99 6f b9 24 27 ae 41 e4 ...',
    isCrypto: true,
  },
  {
    tag: 7,
    name: 'ECDSA Digital Signature',
    description: 'secp256k1 cryptographic signature issued via device CSID',
    length: 64,
    value: '3045022100a7b4c92...signed_by_zatca_device_private_key',
    hexValue: '30 45 02 21 00 a7 b4 c9 21 44 8a c9 e1 ...',
    isCrypto: true,
  },
  {
    tag: 8,
    name: 'ECDSA Public Key',
    description: 'Public verification key from onboarded EGS CSID certificate',
    length: 64,
    value: '04c8f2b7a9...egs_device_public_certificate_key',
    hexValue: '04 c8 f2 b7 a9 e2 45 d8 b9 12 ...',
    isCrypto: true,
  },
  {
    tag: 9,
    name: 'Cryptographic Stamp Identifier',
    description: 'ZATCA Fatoora compliance certification signature',
    length: 32,
    value: 'csid_prod_zatca_clearance_stamp_8849',
    hexValue: '63 73 69 64 5f 70 72 6f 64 5f 7a 61 ...',
    isCrypto: true,
  },
]

export default function WakatDemo() {
  const [selectedTag, setSelectedTag] = useState<number>(6)
  const [isTampered, setIsTampered] = useState<boolean>(false)

  const activeTag = ZATCA_TAGS.find(t => t.tag === selectedTag) || ZATCA_TAGS[0]

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans">
      {/* Top Header */}
      <header className="border-b border-[#27272a] bg-[#111113]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/#projects" 
              className="text-xs font-mono text-[#a1a1aa] hover:text-white flex items-center gap-1.5 transition-colors border border-[#27272a] px-2.5 py-1.5 rounded-md hover:bg-[#18181b]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>
            <span className="text-[#3f3f46]">/</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white">Wakat</span>
              <span className="text-[11px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded">
                ZATCA Phase 2 Cryptography
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#71717a]">
              Production E-Invoicing Engine
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-mono bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded text-[#a1a1aa]">
              ZATCA Fatoora Phase 2
            </span>
            <span className="text-[10px] font-mono bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded text-[#a1a1aa]">
              ECDSA P-256 Signatures
            </span>
            <span className="text-[10px] font-mono bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded text-[#a1a1aa]">
              UBL 2.1 Canonical XML
            </span>
            <span className="text-[10px] font-mono bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded text-emerald-400 border-emerald-900">
              9-Tag TLV Hex Encoding
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            ZATCA Phase 2 TLV QR Inspector & Cryptographic Hash Chain
          </h1>
          <p className="text-sm text-[#a1a1aa] max-w-3xl leading-relaxed">
            Wakat is a multi-tenant accounting platform for the Saudi market. Under ZATCA Phase 2 regulations, 
            every tax invoice must embed a tamper-proof 9-tag TLV QR code signed by an ECDSA device certificate 
            and linked to a sequential SHA-256 hash chain.
          </p>
        </div>

        {/* Section 1: 9-Tag TLV QR Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Tag Selector Grid (5 cols) */}
          <div className="lg:col-span-5 bg-[#121215] border border-[#27272a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-[#71717a] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> TLV Tags (1 - 9)
              </span>
              <span className="text-[11px] font-mono text-[#71717a]">
                Click tag to inspect bytes
              </span>
            </div>

            <div className="space-y-1.5">
              {ZATCA_TAGS.map((t) => (
                <button
                  key={t.tag}
                  onClick={() => setSelectedTag(t.tag)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-mono text-xs flex items-center justify-between transition-colors border ${
                    selectedTag === t.tag
                      ? 'bg-emerald-950/60 border-emerald-800 text-white'
                      : 'bg-[#18181b] border-[#27272a] text-[#a1a1aa] hover:bg-[#27272a]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-black/40 flex items-center justify-center text-[10px] font-bold text-emerald-400 border border-emerald-900/40">
                      T{t.tag}
                    </span>
                    <span className="font-medium truncate max-w-[170px]">{t.name}</span>
                  </div>
                  <span className="text-[10px] text-[#71717a]">
                    {t.length} bytes
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Byte Inspector Window (7 cols) */}
          <div className="lg:col-span-7 bg-[#121215] border border-[#27272a] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-[#71717a] flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-emerald-400" /> Byte-Level Tag Decomposition
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Tag 0x0{activeTag.tag}
                </span>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4 font-mono text-xs space-y-3">
                <div>
                  <div className="text-[#71717a] text-[10px] uppercase">Tag Name & Purpose</div>
                  <div className="text-white text-sm font-semibold mt-0.5">{activeTag.name}</div>
                  <div className="text-[#a1a1aa] text-xs mt-0.5">{activeTag.description}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1f1f23]">
                  <div>
                    <div className="text-[#71717a] text-[10px] uppercase">Tag Identifier (1 Byte)</div>
                    <div className="text-emerald-400 font-bold mt-0.5">0x0{activeTag.tag}</div>
                  </div>
                  <div>
                    <div className="text-[#71717a] text-[10px] uppercase">Length Header (1 Byte)</div>
                    <div className="text-cyan-400 font-bold mt-0.5">{activeTag.length} (0x{activeTag.length.toString(16).padStart(2, '0')})</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1f1f23]">
                  <div className="text-[#71717a] text-[10px] uppercase">Decoded Value String</div>
                  <div className="text-white bg-[#18181b] p-2.5 rounded border border-[#27272a] mt-1 break-all">
                    {activeTag.value}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1f1f23]">
                  <div className="text-[#71717a] text-[10px] uppercase">Raw Hexadecimal Stream</div>
                  <div className="text-[#a1a1aa] bg-[#18181b] p-2.5 rounded border border-[#27272a] mt-1 font-mono text-[11px] break-all">
                    {activeTag.hexValue}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>Base64 TLV Spec (ZATCA Standard)</span>
              <span className="text-emerald-400">✓ Cryptographically Valid</span>
            </div>
          </div>
        </div>

        {/* Section 2: Tamper-Evident Hash Chain Visualizer */}
        <section className="bg-[#121215] border border-[#27272a] rounded-xl p-5 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold tracking-wide uppercase text-white">
                  Sequential Hash Chain Ledger (PIH - Previous Invoice Hash)
                </h2>
              </div>
              <p className="text-xs text-[#a1a1aa] mt-0.5">
                Each tax invoice embeds the SHA-256 hash of the preceding invoice in its UBL 2.1 XML before signing.
              </p>
            </div>

            <button
              onClick={() => setIsTampered(!isTampered)}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border ${
                isTampered 
                  ? 'bg-red-950/80 text-red-300 border-red-800' 
                  : 'bg-[#18181b] text-[#a1a1aa] border-[#27272a] hover:bg-[#27272a]'
              }`}
            >
              {isTampered ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Ledger to Valid
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Simulate Database Tamper
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            {/* Block 101 */}
            <div className={`p-4 rounded-lg border transition-all ${
              isTampered 
                ? 'bg-red-950/30 border-red-900 text-red-200' 
                : 'bg-[#09090b] border-[#27272a] text-[#a1a1aa]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">Invoice #INV-101</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${
                  isTampered ? 'bg-red-900/60 border-red-700 text-white' : 'bg-emerald-950 border-emerald-800 text-emerald-400'
                }`}>
                  {isTampered ? 'TAMPERED AMOUNT' : 'CLEARED'}
                </span>
              </div>
              <div className="text-[11px] text-[#71717a]">Total: {isTampered ? 'SAR 99,999.00 (Modified!)' : 'SAR 4,500.00'}</div>
              <div className="mt-2 text-[10px] text-[#71717a]">Current Hash:</div>
              <div className="font-mono text-[10px] text-white truncate">
                {isTampered ? 'f88a91c2...[ALTERED_DIGEST]' : '9a4b881c...7721df'}
              </div>
            </div>

            {/* Block 102 */}
            <div className={`p-4 rounded-lg border transition-all ${
              isTampered 
                ? 'bg-red-950/30 border-red-900 text-red-200' 
                : 'bg-[#09090b] border-[#27272a] text-[#a1a1aa]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">Invoice #INV-102</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${
                  isTampered ? 'bg-red-900/60 border-red-700 text-white' : 'bg-emerald-950 border-emerald-800 text-emerald-400'
                }`}>
                  {isTampered ? 'CHAIN BROKEN' : 'CLEARED'}
                </span>
              </div>
              <div className="text-[11px] text-[#71717a]">Total: SAR 11,500.00</div>
              <div className="mt-2 text-[10px] text-[#71717a]">Embedded PIH (from #101):</div>
              <div className={`font-mono text-[10px] truncate ${isTampered ? 'text-red-400 font-bold' : 'text-white'}`}>
                {isTampered ? 'MISMATCH! Expected: 9a4b881c' : '9a4b881c...7721df'}
              </div>
            </div>

            {/* Block 103 */}
            <div className={`p-4 rounded-lg border transition-all ${
              isTampered 
                ? 'bg-red-950/30 border-red-900 text-red-200' 
                : 'bg-[#09090b] border-[#27272a] text-[#a1a1aa]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">Invoice #INV-103</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${
                  isTampered ? 'bg-red-900/60 border-red-700 text-white' : 'bg-emerald-950 border-emerald-800 text-emerald-400'
                }`}>
                  {isTampered ? 'REJECTED BY ZATCA' : 'CLEARED'}
                </span>
              </div>
              <div className="text-[11px] text-[#71717a]">Total: SAR 2,800.00</div>
              <div className="mt-2 text-[10px] text-[#71717a]">Audit Verification:</div>
              <div className={`font-mono text-[10px] ${isTampered ? 'text-red-400 font-bold' : 'text-emerald-400'}`}>
                {isTampered ? 'INVALID SIGNATURE' : '✓ Audit Trail Validated'}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
