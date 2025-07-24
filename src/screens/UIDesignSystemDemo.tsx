import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Card,
  Input,
  Icon,
  Heading1,
  Heading2,
  BodyMedium,
  Caption,
} from '../components/ui';
import { FadeInView, SlideUpView, PressableAnimated } from '../components/animations';
import { SpacingTokens } from '../styles/tokens/spacing';
import { ColorTokens } from '../styles/tokens/colors';

/**
 * UI Design System Demo Screen
 * 
 * Demonstrates all the implemented UI components and design tokens
 * in a comprehensive showcase for the TravelTurkey app.
 */
export const UIDesignSystemDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FadeInView duration={500}>
        <View style={styles.section}>
          <Heading1 align="center" style={styles.title}>
            🇹🇷 TravelTurkey UI Design System
          </Heading1>
          <BodyMedium align="center" color="secondary">
            Modern bileşenler ve Türk turizmi teması
          </BodyMedium>
        </View>
      </FadeInView>

      {/* Typography Section */}
      <SlideUpView delay={200}>
        <View style={styles.section}>
          <Heading2>📝 Typography</Heading2>
          <View style={styles.subsection}>
            <Heading1>Heading 1 - Ana Başlık</Heading1>
            <Heading2>Heading 2 - Alt Başlık</Heading2>
            <BodyMedium>Body Medium - Normal metin içeriği</BodyMedium>
            <Caption>Caption - Küçük açıklama metni</Caption>
          </View>
        </View>
      </SlideUpView>

      {/* Button Section */}
      <SlideUpView delay={400}>
        <View style={styles.section}>
          <Heading2>🔘 Buttons</Heading2>
          <View style={styles.subsection}>
            <Button title="Primary Button" variant="primary" />
            <Button title="Secondary Button" variant="secondary" />
            <Button title="Ghost Button" variant="ghost" />
            <Button title="Danger Button" variant="danger" />
            
            <View style={styles.row}>
              <Button title="Small" size="small" style={styles.buttonSmall} />
              <Button title="Medium" size="medium" style={styles.buttonSmall} />
              <Button title="Large" size="large" style={styles.buttonSmall} />
            </View>
            
            <Button 
              title="Keşfet" 
              variant="primary" 
              icon="🔍" 
              iconPosition="left"
            />
            <Button 
              title="Loading..." 
              variant="primary" 
              loading={true}
            />
          </View>
        </View>
      </SlideUpView>

      {/* Input Section */}
      <SlideUpView delay={600}>
        <View style={styles.section}>
          <Heading2>📝 Inputs</Heading2>
          <View style={styles.subsection}>
            <Input
              value={inputValue}
              onChangeText={setInputValue}
              label="Normal Input"
              placeholder="Metin girin"
            />
            
            <Input
              value={searchValue}
              onChangeText={setSearchValue}
              type="search"
              placeholder="Arama yapın..."
              leftIcon="🔍"
            />
            
            <Input
              value=""
              onChangeText={() => {}}
              type="email"
              label="E-posta"
              placeholder="ornek@email.com"
              validationState="default"
            />
            
            <Input
              value=""
              onChangeText={() => {}}
              type="password"
              label="Şifre"
              placeholder="Şifrenizi girin"
              showPasswordToggle
            />
            
            <Input
              value="Hatalı giriş"
              onChangeText={() => {}}
              label="Error State"
              validationState="error"
              errorMessage="Bu alan zorunludur"
            />
          </View>
        </View>
      </SlideUpView>

      {/* Icon Section */}
      <SlideUpView delay={800}>
        <View style={styles.section}>
          <Heading2>🎨 Icons</Heading2>
          <BodyMedium color="secondary">
            Türk turizmi temalı ikonlar
          </BodyMedium>
          <View style={styles.iconGrid}>
            <View style={styles.iconItem}>
              <Icon name="mosque" size="lg" />
              <Caption>Cami</Caption>
            </View>
            <View style={styles.iconItem}>
              <Icon name="beach" size="lg" />
              <Caption>Plaj</Caption>
            </View>
            <View style={styles.iconItem}>
              <Icon name="mountain" size="lg" />
              <Caption>Dağ</Caption>
            </View>
            <View style={styles.iconItem}>
              <Icon name="historical" size="lg" />
              <Caption>Tarihi</Caption>
            </View>
            <View style={styles.iconItem}>
              <Icon name="food" size="lg" />
              <Caption>Yemek</Caption>
            </View>
            <View style={styles.iconItem}>
              <Icon name="hotel" size="lg" />
              <Caption>Otel</Caption>
            </View>
            <View style={styles.iconItem}>
              <Icon name="transport" size="lg" />
              <Caption>Ulaşım</Caption>
            </View>
            <View style={styles.iconItem}>
              <Icon name="culture" size="lg" />
              <Caption>Kültür</Caption>
            </View>
          </View>
        </View>
      </SlideUpView>

      {/* Card Section */}
      <SlideUpView delay={1000}>
        <View style={styles.section}>
          <Heading2>🃏 Cards</Heading2>
          <View style={styles.subsection}>
            {/* Default Card */}
            <Card variant="default">
              <Heading2>Default Card</Heading2>
              <BodyMedium>Bu standart bir kart bileşenidir.</BodyMedium>
            </Card>

            {/* Elevated Card */}
            <Card variant="elevated">
              <Heading2>Elevated Card</Heading2>
              <BodyMedium>Bu yükseltilmiş gölgeli bir karttır.</BodyMedium>
            </Card>

            {/* Tourism Card with Image */}
            <Card
              variant="tourism"
              imageSource={{ 
                uri: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=200&fit=crop'
              }}
              imageLayout="background"
              gradientOverlay
              badge="Öne Çıkan"
              badgePosition="top-right"
            >
              <View style={styles.tourismCardContent}>
                <Heading2 color="inverse">Kapadokya</Heading2>
                <BodyMedium color="inverse">
                  Benzersiz peri bacaları ve balon turları
                </BodyMedium>
              </View>
            </Card>

            {/* Horizontal Card */}
            <Card
              variant="outlined"
              imageSource={{ 
                uri: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=200&h=150&fit=crop'
              }}
              imageLayout="left"
            >
              <Heading2>İstanbul</Heading2>
              <BodyMedium>Tarihi yarımada ve modern yaşam</BodyMedium>
            </Card>
          </View>
        </View>
      </SlideUpView>

      {/* Interactive Section */}
      <SlideUpView delay={1200}>
        <View style={styles.section}>
          <Heading2>⚡ Animations</Heading2>
          <BodyMedium color="secondary">
            Dokunmatik geri bildirimler
          </BodyMedium>
          <View style={styles.subsection}>
            <PressableAnimated onPress={() => console.log('Pressed!')}>
              <Card variant="outlined">
                <Heading2>Dokunmatik Kart</Heading2>
                <BodyMedium>Bu karta dokunarak animasyonu görün</BodyMedium>
              </Card>
            </PressableAnimated>
          </View>
        </View>
      </SlideUpView>

      {/* Color Palette */}
      <SlideUpView delay={1400}>
        <View style={styles.section}>
          <Heading2>🎨 Color Palette</Heading2>
          <View style={styles.colorGrid}>
            <View style={[styles.colorItem, { backgroundColor: ColorTokens.primary[500] }]}>
              <Caption color="inverse">Turkish Red</Caption>
            </View>
            <View style={[styles.colorItem, { backgroundColor: ColorTokens.secondary[500] }]}>
              <Caption color="inverse">Bosphorus Blue</Caption>
            </View>
            <View style={[styles.colorItem, { backgroundColor: ColorTokens.accent.bosphorus }]}>
              <Caption color="inverse">Bosphorus</Caption>
            </View>
            <View style={[styles.colorItem, { backgroundColor: ColorTokens.accent.cappadocia }]}>
              <Caption color="inverse">Cappadocia</Caption>
            </View>
            <View style={[styles.colorItem, { backgroundColor: ColorTokens.accent.golden }]}>
              <Caption color="inverse">Golden</Caption>
            </View>
            <View style={[styles.colorItem, { backgroundColor: ColorTokens.accent.turkish_green }]}>
              <Caption color="inverse">Turkish Green</Caption>
            </View>
          </View>
        </View>
      </SlideUpView>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  section: {
    padding: SpacingTokens.lg,
  },
  subsection: {
    marginTop: SpacingTokens.md,
    gap: SpacingTokens.md,
  },
  title: {
    marginBottom: SpacingTokens.sm,
  },
  row: {
    flexDirection: 'row',
    gap: SpacingTokens.sm,
  },
  buttonSmall: {
    flex: 1,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SpacingTokens.lg,
    marginTop: SpacingTokens.md,
  },
  iconItem: {
    alignItems: 'center',
    gap: SpacingTokens.xs,
    minWidth: 60,
  },
  tourismCardContent: {
    marginTop: 'auto',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SpacingTokens.sm,
    marginTop: SpacingTokens.md,
  },
  colorItem: {
    padding: SpacingTokens.md,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  bottomSpacing: {
    height: SpacingTokens['4xl'],
  },
});

export default UIDesignSystemDemo;