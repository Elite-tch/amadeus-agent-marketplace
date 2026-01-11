'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileCode, ArrowLeft, Check, X, CloudUpload, Server, Image, Video, CheckCircle } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { validateAgentForm, ValidationErrors } from '@/lib/validation';

export default function PublishPage() {
  const { account, isConnected } = useWallet();
  const [selectedOption, setSelectedOption] = useState<'platform' | 'self-hosted' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    mcpServerUrl: '',
    protocol: 'sse' as 'stdio' | 'sse',
    pricing: 'free',
    price: '',
    githubUrl: '',
    websiteUrl: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    logoUrl: '',
    demoVideoUrl: '',
    screenshotUrls: [] as string[],
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (file: File, type: 'logo' | 'video' | 'screenshot') => {
    try {
      setUploadingFiles(true);
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('type', type);

      const response = await fetch('/api/agent/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Update uploaded files state
      if (type === 'logo') {
        setUploadedFiles(prev => ({ ...prev, logoUrl: data.url }));
      } else if (type === 'video') {
        setUploadedFiles(prev => ({ ...prev, demoVideoUrl: data.url }));
      } else if (type === 'screenshot') {
        setUploadedFiles(prev => ({
          ...prev,
          screenshotUrls: [...prev.screenshotUrls, data.url]
        }));
      }

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !account) {
      alert('Please connect your Amadeus wallet first');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        tags: [], // Empty array since tags field was removed from form
        mcpConfig: {
          serverUrl: formData.mcpServerUrl,
          protocol: formData.protocol,
        },
        pricing: {
          model: formData.pricing,
          amount: formData.pricing === 'paid' ? parseFloat(formData.price) * 1000000000 : 0, // Convert to atomic units
          currency: 'AMA',
        },
        owner: account,
        logoUrl: uploadedFiles.logoUrl,
        demoVideoUrl: uploadedFiles.demoVideoUrl,
        screenshotUrls: uploadedFiles.screenshotUrls,
        githubUrl: formData.githubUrl,
        websiteUrl: formData.websiteUrl,
      };

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      // Show success modal instead of alert
      setShowSuccessModal(true);

      // Reset form (but keep selectedOption so user stays on form view until modal is closed)
      setFormData({
        name: '',
        description: '',
        category: '',
        mcpServerUrl: '',
        protocol: 'sse',
        pricing: 'free',
        price: '',
        githubUrl: '',
        websiteUrl: '',
      });
      setUploadedFiles({
        logoUrl: '',
        demoVideoUrl: '',
        screenshotUrls: [],
      });
      setCurrentStep(1);
      // Don't reset selectedOption here - let the modal close handler do it

    } catch (error) {
      console.error('Submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit agent');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = (nextStep: number) => {
    const stepErrors = validateAgentForm(formData, currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep(nextStep);
  };

  // If no option selected, show selection screen
  if (!selectedOption) {
    return (
      <div className="min-h-screen bg-[#050505] pt-28 pb-16">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 font-mono">
              <span className="text-white uppercase">Deploy New </span>
              <span className="text-[#00ff9d] uppercase">AI Agent</span>
            </h1>
            <p className="text-slate-400 font-mono">
              Choose how you want to deploy your agent
            </p>
          </motion.div>

          {/* Deployment Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Option 1: Platform Hosting (Coming Soon) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative glass-panel p-8 border-2 border-[#333] opacity-60 cursor-not-allowed"
            >
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4 bg-[#00ff9d] text-black px-3 py-1 text-xs font-bold font-mono">
                COMING SOON
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#00ff9d]/10 flex items-center justify-center mb-6">
                  <CloudUpload className="w-10 h-10 text-[#00ff9d]" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 font-mono">
                  Deploy With Us
                </h3>

                <p className="text-slate-400 mb-6">
                  We handle hosting, scaling, and infrastructure for your MCP agent
                </p>

                <div className="space-y-2 text-sm text-slate-500 text-left w-full">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                    <span>Automatic scaling & load balancing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                    <span>Built-in monitoring & analytics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                    <span>99.9% uptime SLA</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                    <span>Zero DevOps required</span>
                  </div>
                </div>

                <button
                  disabled
                  className="mt-8 w-full btn-primary opacity-50 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </motion.div>

            {/* Option 2: Self-Hosted (Active) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedOption('self-hosted')}
              className="glass-panel p-8 border-2 border-[#00ff9d]/30 hover:border-[#00ff9d] transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#00ff9d]/10 flex items-center justify-center mb-6 group-hover:bg-[#00ff9d]/20 transition-colors">
                  <Server className="w-10 h-10 text-[#00ff9d]" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 font-mono">
                  Self-Hosted Agent
                </h3>

                <p className="text-slate-400 mb-6">
                  Upload your self hosted AI agent to the marketplace
                </p>

                <div className="space-y-2 text-sm text-slate-500 text-left w-full">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                    <span>Full control over infrastructure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                    <span>Deploy on any platform (Render, Railway, etc.)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                    <span>Custom domain support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00ff9d] mt-0.5 flex-shrink-0" />
                    <span>Low platform fees</span>
                  </div>
                </div>

                <button className="mt-8 w-full btn-primary group-hover:bg-[#00cc7d]">
                  Upload Agent →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Show form for self-hosted agent
  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => setSelectedOption(null)}
          className="flex items-center gap-2 text-[#00ff9d] hover:text-[#00cc7d] mb-8 font-mono"
        >
          <ArrowLeft size={20} />
          Back to options
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-mono font-bold mb-3 uppercase">
            <span className="text-white">Upload new </span>
            <span className="text-[#00ff9d]">AI Agent</span>
          </h1>
          <p className="font-mono text-slate-500 max-w-lg mx-auto">
            Initialize deployment sequence. Your agent will be verified by the Amadeus DAO before listing on the public registry.
          </p>
        </motion.div>

        {/* Form Container with Corner Accents */}
        <div className="bg-[#0a0a0a] border border-[#333] relative overflow-hidden group">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff9d]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff9d]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff9d]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff9d]"></div>

          {/* Progress / Steps */}
          <div className="bg-[#111] border-b border-[#333] p-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-[#00ff9d]" : ""}`}>
              <span className={`w-6 h-6 rounded flex items-center justify-center border ${currentStep >= 1 ? "bg-[#00ff9d] text-black border-[#00ff9d]" : "border-[#333]"}`}>1</span>
              Agent_Info
            </div>
            <div className={`h-px flex-1 mx-4 ${currentStep >= 2 ? "bg-[#00ff9d]" : "bg-[#333]"}`}></div>
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-[#00ff9d]" : ""}`}>
              <span className={`w-6 h-6 rounded flex items-center justify-center border ${currentStep >= 2 ? "bg-[#00ff9d] text-black border-[#00ff9d]" : "border-[#333]"}`}>2</span>
              MCP_Info
            </div>
            <div className={`h-px flex-1 mx-4 ${currentStep >= 3 ? "bg-[#00ff9d]" : "bg-[#333]"}`}></div>
            <div className={`flex items-center gap-2 ${currentStep >= 3 ? "text-[#00ff9d]" : ""}`}>
              <span className={`w-6 h-6 rounded flex items-center justify-center border ${currentStep >= 3 ? "bg-[#00ff9d] text-black border-[#00ff9d]" : "border-[#333]"}`}>3</span>
              Additional_Info
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Step 1: Agent Identity */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 uppercase"
              >
                <h2 className="text-xl font-bold text-white font-mono mb-6 uppercase">Agent Identity</h2>

                {/* Name and Category on same line */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Agent Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#0a0a0a] border ${errors.name ? 'border-red-500' : 'border-[#333]'} text-white font-mono focus:border-[#00ff9d] focus:outline-none`}
                      placeholder="e.g., DeFi Whale Watcher"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 font-mono">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 uppercase bg-[#0a0a0a] border ${errors.category ? 'border-red-500' : 'border-[#333]'} text-white font-mono focus:border-[#00ff9d] focus:outline-none`}
                    >
                      <option value="">Select category</option>
                      <option value="trading">Trading</option>
                      <option value="analysis">Analysis</option>
                      <option value="defi">DeFi</option>
                      <option value="nft">NFT</option>
                      <option value="automation">Automation</option>
                      <option value="gaming">Gaming</option>
                      <option value="social">Social</option>
                      <option value="research">Research</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1 font-mono">{errors.category}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-[#0a0a0a] border ${errors.description ? 'border-red-500' : 'border-[#333]'} text-white font-mono focus:border-[#00ff9d] focus:outline-none resize-none`}
                    placeholder="Describe what your agent does..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1 font-mono">{errors.description}</p>
                  )}
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Agent Logo (Optional)</label>
                  <div className="border-2 border-dashed border-[#333] hover:border-[#00ff9d] transition-colors p-4 text-center">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'logo');
                      }}
                      className="hidden"
                      id="logo-upload"
                      disabled={uploadingFiles}
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      {uploadedFiles.logoUrl ? (
                        <div className="flex items-center gap-2 text-[#00ff9d]">
                          <Check size={20} />
                          <span className="text-sm uppercase">Logo uploaded</span>
                        </div>
                      ) : (
                        <>
                          <Image className="w-8 h-8 text-slate-500" />
                          <span className="text-sm text-slate-500 uppercase">Click to upload logo (PNG, JPG, SVG - Max 2MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleNextStep(2)}
                  className="w-full btn-primary"
                >
                  Continue →
                </button>
              </motion.div>
            )}

            {/* Step 2: MCP Configuration & Media */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white font-mono mb-6 uppercase">MCP & Pricing</h2>

                <div>
                  <label className="block text-slate-400 mb-2 font-mono text-sm">MCP Server URL *</label>
                  <input
                    type="url"
                    name="mcpServerUrl"
                    value={formData.mcpServerUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#0a0a0a] border ${errors.mcpServerUrl ? 'border-red-500' : 'border-[#333]'} text-white font-mono focus:border-[#00ff9d] focus:outline-none`}
                    placeholder="https://your-agent.com/mcp"
                  />
                  <p className="text-slate-500 text-xs mt-2 font-mono">
                    The URL where your MCP server is hosted
                  </p>
                  {errors.mcpServerUrl && (
                    <p className="text-red-500 text-xs mt-1 font-mono">{errors.mcpServerUrl}</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Protocol</label>
                  <select
                    name="protocol"
                    value={formData.protocol}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] text-white font-mono focus:border-[#00ff9d] focus:outline-none uppercase"
                  >
                    <option value="sse">SSE (Server-Sent Events)</option>
                    <option value="stdio">STDIO</option>
                  </select>
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Pricing Model *</label>
                  <select
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] text-white font-mono focus:border-[#00ff9d] focus:outline-none uppercase"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                {formData.pricing === 'paid' && (
                  <div>
                    <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Price (AMA) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#0a0a0a] border ${errors.price ? 'border-red-500' : 'border-[#333]'} text-white font-mono focus:border-[#00ff9d] focus:outline-none`}
                      placeholder="10"
                      min="0"
                      step="0.01"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-xs mt-1 font-mono">{errors.price}</p>
                    )}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 btn-secondary"
                    disabled={uploadingFiles}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNextStep(3)}
                    className="flex-1 btn-primary"
                    disabled={uploadingFiles}
                  >
                    {uploadingFiles ? 'Uploading...' : 'Continue →'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Info */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white font-mono mb-6 uppercase">Additional Info</h2>

                {/* Video Upload */}
                <div>
                  <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Demo Video (Optional)</label>
                  <div className="border-2 border-dashed border-[#333] hover:border-[#00ff9d] transition-colors p-4 text-center">
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'video');
                      }}
                      className="hidden"
                      id="video-upload"
                      disabled={uploadingFiles}
                    />
                    <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      {uploadedFiles.demoVideoUrl ? (
                        <div className="flex items-center gap-2 text-[#00ff9d]">
                          <Check size={20} />
                          <span className="text-sm uppercase">Video uploaded</span>
                        </div>
                      ) : (
                        <>
                          <Video className="w-8 h-8 text-slate-500" />
                          <span className="text-sm text-slate-500 uppercase">Click to upload demo video (MP4, WebM - Max 50MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>



                <div>
                  <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] text-white font-mono focus:border-[#00ff9d] focus:outline-none"
                    placeholder="https://github.com/user/repo"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 font-mono text-sm uppercase">Website URL</label>
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] text-white font-mono focus:border-[#00ff9d] focus:outline-none"
                    placeholder="https://your-agent.com"
                  />
                </div>

                {!isConnected && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded">
                    <p className="text-yellow-500 text-sm font-mono">
                      ⚠️ Please connect your Amadeus wallet to submit the agent
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 btn-secondary"
                    disabled={isSubmitting}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                    disabled={isSubmitting || !isConnected}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Agent'}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowSuccessModal(false);
              setSelectedOption(null); // Reset to deployment options screen
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0a0a0a] border-2 border-[#333] max-w-md w-full overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#00ff9d]/5 pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setSelectedOption(null); // Reset to deployment options screen
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 text-center relative">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="mx-auto h-20 w-20 text-[#00ff9d] mb-4" />
                </motion.div>

                {/* Success Title */}
                <h2 className="text-2xl font-bold text-white mb-2 font-mono uppercase">
                  Agent Registered
                </h2>

                {/* Success Message */}
                <p className="text-slate-400 mb-6">
                  Your agent has been submitted successfully and will be listed on the public registry.
                </p>

                {/* Info Box */}
                {/* <div className="mb-6 p-4 bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-left">
                  <div className="text-xs text-[#00ff9d] uppercase tracking-widest mb-2">
                    What's Next?
                  </div>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-[#00ff9d] mt-0.5 shrink-0" />
                      <span>DAO review process (1-3 days)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-[#00ff9d] mt-0.5 shrink-0" />
                      <span>Notification upon approval</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-[#00ff9d] mt-0.5 shrink-0" />
                      <span>Agent listed on marketplace</span>
                    </li>
                  </ul>
                </div> */}

                {/* Action Button */}
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setSelectedOption(null); // Reset to deployment options screen
                  }}
                  className="w-full bg-[#00ff9d] text-black py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#00cc7d] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
