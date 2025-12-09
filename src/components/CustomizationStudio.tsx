import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Shirt, Ruler, Upload, Image, Trash2, Move, 
  RotateCw, ZoomIn, Sparkles, Loader2, Skull,
  Flame, Heart, Star, Zap, Crown, Eye, Anchor, Flower2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore, DesignGraphic } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const garmentTypes = [
  { id: 'hoodie', label: 'Hoodie' },
  { id: 'tee', label: 'Tee' },
  { id: 'longsleeve', label: 'Long Sleeve' },
  { id: 'croptop', label: 'Crop Top' },
  { id: 'trackpants', label: 'Track Pants' },
  { id: 'jacket', label: 'Bomber' },
] as const;

const baseColors = [
  { id: 'void-black', color: '#0a0a0a', label: 'Void Black' },
  { id: 'blood-red', color: '#dc2626', label: 'Blood Red' },
  { id: 'bone-white', color: '#f5f5f5', label: 'Bone White' },
  { id: 'charcoal', color: '#1f1f1f', label: 'Charcoal' },
  { id: 'crimson', color: '#991b1b', label: 'Crimson' },
  { id: 'ash-grey', color: '#3f3f3f', label: 'Ash Grey' },
  { id: 'sunset-orange', color: '#ff4500', label: 'Sunset Orange' },
  { id: 'electric-blue', color: '#00ffff', label: 'Electric Blue' },
  { id: 'neon-pink', color: '#ff69b4', label: 'Neon Pink' },
  { id: 'lime-green', color: '#32cd32', label: 'Lime Green' },
  { id: 'gold', color: '#ffd700', label: 'Gold' },
  { id: 'violet', color: '#8a2be2', label: 'Violet' },
];

const fabricTypes = ['Heavy Cotton', 'French Terry', 'Distressed Denim', 'Vintage Wash', 'Raw Selvedge'];
const styleTypes = ['Oversized', 'Boxy Fit', 'Cropped', 'Relaxed', 'Slim'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const presetGraphics = [
  { id: 'skull-roses', name: 'Skull & Roses', category: 'Ed Hardy', icon: Skull },
  { id: 'flaming-heart', name: 'Flaming Heart', category: 'Ed Hardy', icon: Flame },
  { id: 'sacred-heart', name: 'Sacred Heart', category: 'Ed Hardy', icon: Heart },
  { id: 'death-star', name: 'Death Star', category: 'Punk', icon: Star },
  { id: 'lightning', name: 'Lightning Bolt', category: 'Punk', icon: Zap },
  { id: 'crown-thorns', name: 'Crown of Thorns', category: 'Gothic', icon: Crown },
  { id: 'all-seeing', name: 'All Seeing Eye', category: 'Occult', icon: Eye },
  { id: 'anchor', name: 'Sailor Anchor', category: 'Traditional', icon: Anchor },
  { id: 'lotus', name: 'Lotus Flower', category: 'Japanese', icon: Flower2 },
];

interface PreviewState {
  isGenerating: boolean;
  url: string | null;
  error: string | null;
}

export default function CustomizationStudio() {
  const { customization, setCustomization, addGraphic, removeGraphic, updateGraphic, addToCart } = useStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedGraphic, setSelectedGraphic] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewState>({ isGenerating: false, url: null, error: null });
  const [activeTab, setActiveTab] = useState('garment');

  const handleGarmentChange = (type: typeof garmentTypes[number]['id']) => {
    setCustomization({ garmentType: type });
    generatePreview({ ...customization, garmentType: type });
  };

  const handleColorChange = (color: string) => {
    setCustomization({ baseColor: color });
    generatePreview({ ...customization, baseColor: color });
  };

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image file', variant: 'destructive' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newGraphic: DesignGraphic = {
        id: `upload-${Date.now()}`,
        name: file.name,
        type: 'upload',
        url: event.target?.result as string,
        position: { x: 50, y: 40 },
        scale: 1,
        rotation: 0,
      };
      addGraphic(newGraphic);
      setSelectedGraphic(newGraphic.id);
      toast({ title: 'Design uploaded!', description: 'Your graphic has been added to the canvas' });
    };
    reader.readAsDataURL(file);
  }, [addGraphic, toast]);

  const handlePresetGraphicAdd = (preset: typeof presetGraphics[number]) => {
    const newGraphic: DesignGraphic = {
      id: `preset-${preset.id}-${Date.now()}`,
      name: preset.name,
      type: 'preset',
      url: preset.id,
      position: { x: 50, y: 40 },
      scale: 1,
      rotation: 0,
    };
    addGraphic(newGraphic);
    setSelectedGraphic(newGraphic.id);
    toast({ title: `${preset.name} added!`, description: 'Drag to position on your garment' });
  };

  const generatePreview = async (config = customization) => {
    setPreview({ isGenerating: true, url: null, error: null });
    
    try {
      const response = await fetch('/api/generate-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garmentType: config.garmentType,
          baseColor: config.baseColor,
          fabric: config.fabric,
          style: config.style,
          graphics: config.graphics.map(g => ({
            name: g.name,
            type: g.type,
            position: g.position,
            scale: g.scale,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to generate preview');
      
      const data = await response.json();
      setPreview({ isGenerating: false, url: data.imageUrl, error: null });
    } catch {
      console.log('Preview generation not available, using placeholder');
      setPreview({ 
        isGenerating: false, 
        url: null, 
        error: null 
      });
    }
  };

  const handleAddToCart = () => {
    const garmentName = garmentTypes.find(g => g.id === customization.garmentType)?.label || 'Custom Garment';
    const colorName = baseColors.find(c => c.color === customization.baseColor)?.label || 'Custom';
    
    addToCart({
      name: `${colorName} ${garmentName}`,
      customization: { ...customization },
      quantity: 1,
      price: customization.garmentType === 'hoodie' || customization.garmentType === 'jacket' ? 145 : 
             customization.garmentType === 'trackpants' ? 125 : 85,
      previewUrl: preview.url || undefined,
    });

    toast({
      title: 'Added to cart!',
      description: 'Your custom creation is ready for checkout',
    });
  };

  const selectedGraphicData = customization.graphics.find(g => g.id === selectedGraphic);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="relative">
        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
          <CardContent className="p-0">
            <div 
              className="relative aspect-square flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: customization.baseColor }}
            >
              <AnimatePresence mode="wait">
                {preview.isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Generating preview...</p>
                  </motion.div>
                ) : preview.url ? (
                  <motion.img
                    key="preview"
                    src={preview.url}
                    alt="AI Generated Preview"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <div className="absolute inset-0 noise opacity-20" />
                    <div className="relative">
                      <Shirt 
                        className="w-48 h-48 text-white/20" 
                        strokeWidth={0.5}
                      />
                      {customization.graphics.map((graphic) => {
                        const PresetIcon = presetGraphics.find(p => p.id === graphic.url)?.icon || Skull;
                        return (
                          <motion.div
                            key={graphic.id}
                            className={`absolute cursor-move ${selectedGraphic === graphic.id ? 'ring-2 ring-primary' : ''}`}
                            style={{
                              left: `${graphic.position.x}%`,
                              top: `${graphic.position.y}%`,
                              transform: `translate(-50%, -50%) scale(${graphic.scale}) rotate(${graphic.rotation}deg)`,
                            }}
                            onClick={() => setSelectedGraphic(graphic.id)}
                            drag
                            dragMomentum={false}
                            onDrag={(_, info) => {
                              const container = document.querySelector('.aspect-square');
                              if (!container) return;
                              const rect = container.getBoundingClientRect();
                              const x = ((info.point.x - rect.left) / rect.width) * 100;
                              const y = ((info.point.y - rect.top) / rect.height) * 100;
                              updateGraphic(graphic.id, { position: { x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) } });
                            }}
                          >
                            {graphic.type === 'preset' ? (
                              <PresetIcon className="w-16 h-16 text-primary drop-shadow-lg" />
                            ) : (
                              <img src={graphic.url} alt={graphic.name} className="w-20 h-20 object-contain" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {customization.style} {garmentTypes.find(g => g.id === customization.garmentType)?.label}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {selectedGraphicData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">{selectedGraphicData.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      removeGraphic(selectedGraphicData.id);
                      setSelectedGraphic(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs flex items-center gap-2 mb-2">
                      <ZoomIn className="h-3 w-3" /> Scale
                    </Label>
                    <Slider
                      value={[selectedGraphicData.scale]}
                      min={0.5}
                      max={2}
                      step={0.1}
                      onValueChange={([value]) => updateGraphic(selectedGraphicData.id, { scale: value })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs flex items-center gap-2 mb-2">
                      <RotateCw className="h-3 w-3" /> Rotation
                    </Label>
                    <Slider
                      value={[selectedGraphicData.rotation]}
                      min={-180}
                      max={180}
                      step={5}
                      onValueChange={([value]) => updateGraphic(selectedGraphicData.id, { rotation: value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="garment" className="gap-2 data-[state=active]:text-primary">
              <Shirt className="h-4 w-4" /> Garment
            </TabsTrigger>
            <TabsTrigger value="design" className="gap-2 data-[state=active]:text-primary">
              <Image className="h-4 w-4" /> Design
            </TabsTrigger>
            <TabsTrigger value="details" className="gap-2 data-[state=active]:text-primary">
              <Ruler className="h-4 w-4" /> Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="garment" className="space-y-6 mt-6">
            <div>
              <Label className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">
                Garment Type
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {garmentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={customization.garmentType === type.id ? 'default' : 'outline'}
                    className={`h-auto py-4 flex-col gap-2 ${
                      customization.garmentType === type.id ? 'neon-glow' : ''
                    }`}
                    onClick={() => handleGarmentChange(type.id)}
                    data-testid={`button-garment-${type.id}`}
                  >
                    <Shirt className="h-6 w-6" />
                    <span className="text-xs">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">
                Base Color
              </Label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {baseColors.map((colorOption) => (
                  <button
                    key={colorOption.id}
                    className={`w-12 h-12 rounded-md transition-all ${
                      customization.baseColor === colorOption.color
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: colorOption.color }}
                    onClick={() => handleColorChange(colorOption.color)}
                    title={colorOption.label}
                    data-testid={`button-color-${colorOption.id}`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-6 mt-6">
            <div>
              <Label className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">
                Upload Your Design
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                data-testid="input-upload-design"
              />
              <Button
                variant="outline"
                className="w-full h-24 border-dashed border-2 hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Click to upload your graphic</span>
                  <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                </div>
              </Button>
            </div>

            <div>
              <Label className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">
                Or Choose a Preset Design
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {presetGraphics.map((preset) => {
                  const IconComponent = preset.icon;
                  return (
                    <Button
                      key={preset.id}
                      variant="outline"
                      className="h-auto py-4 flex-col gap-2 hover:border-primary hover:text-primary"
                      onClick={() => handlePresetGraphicAdd(preset)}
                      data-testid={`button-preset-${preset.id}`}
                    >
                      <IconComponent className="h-8 w-8" />
                      <span className="text-xs">{preset.name}</span>
                      <span className="text-[10px] text-muted-foreground">{preset.category}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {customization.graphics.length > 0 && (
              <div>
                <Label className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">
                  Your Graphics ({customization.graphics.length})
                </Label>
                <div className="space-y-2">
                  {customization.graphics.map((graphic) => (
                    <div
                      key={graphic.id}
                      className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedGraphic === graphic.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedGraphic(graphic.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Move className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{graphic.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeGraphic(graphic.id);
                          if (selectedGraphic === graphic.id) setSelectedGraphic(null);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-6 mt-6">
            <div>
              <Label className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">
                Fabric
              </Label>
              <div className="flex flex-wrap gap-2">
                {fabricTypes.map((fabric) => (
                  <Button
                    key={fabric}
                    variant={customization.fabric === fabric ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCustomization({ fabric })}
                    data-testid={`button-fabric-${fabric.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {fabric}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">
                Style
              </Label>
              <div className="flex flex-wrap gap-2">
                {styleTypes.map((style) => (
                  <Button
                    key={style}
                    variant={customization.style === style ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCustomization({ style })}
                    data-testid={`button-style-${style.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">
                Size
              </Label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={customization.size === size ? 'default' : 'outline'}
                    size="sm"
                    className="w-12"
                    onClick={() => setCustomization({ size })}
                    data-testid={`button-size-${size.toLowerCase()}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => generatePreview()}
            disabled={preview.isGenerating}
            data-testid="button-generate-preview"
          >
            {preview.isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate AI Preview
          </Button>
          <Button
            className="flex-1 neon-glow"
            onClick={handleAddToCart}
            data-testid="button-add-to-cart"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
