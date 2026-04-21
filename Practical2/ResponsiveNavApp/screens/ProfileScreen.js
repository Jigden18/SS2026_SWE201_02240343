import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Data

const SKILLS = [
  { id: '1', name: 'React Native', level: 3, iconName: 'logo-react' },
  { id: '2', name: 'JavaScript',   level: 60, iconName: 'logo-javascript' },
  { id: '3', name: 'Node.js',      level: 50, iconName: 'server-outline' },
  { id: '4', name: 'UI/UX Design', level: 70, iconName: 'color-palette-outline' },
  { id: '5', name: 'TypeScript',   level: 50, iconName: 'code-slash-outline' },
];

const CONTACT_INFO = [
  { id: '1', label: 'jigden.shakya@email.com', sub: 'Primary email', iconName: 'mail-outline', color: '#6366f1' },
{ id: '2', label: 'linkedin.com/in/jigdenshakya', sub: 'LinkedIn', iconName: 'logo-linkedin', color: '#0a66c2' },
  { id: '3', label: 'github.com/jigden18', sub: 'GitHub', iconName: 'logo-github', color: '#1e293b' },
  { id: '4', label: '+975 17 123 456', sub: 'WhatsApp / Call', iconName: 'call-outline', color: '#22c55e' },
];

const EDUCATION = [
  { id: '1', label: 'BE Software Engineering', sub: 'College of Science and Technology, 2028', iconName: 'school-outline' },
  { id: '2', label: 'High School',   sub: 'Samtse Higher Secondary School, 2024', iconName: 'ribbon-outline' },
];

const TABS = ['About', 'Skills', 'Contact'];

// Component

export default function ProfileScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const [activeTab, setActiveTab] = useState('About');

  // Render helpers for FlatList items

  const renderSkill = ({ item }) => (
    <View style={styles.skillRow}>
      <View style={styles.skillLabelRow}>
        <View style={styles.skillLeft}>
          <View style={styles.skillIconWrap}>
            <Ionicons name={item.iconName} size={15} color="#6366f1" />
          </View>
          <Text style={styles.skillName}>{item.name}</Text>
        </View>
        <Text style={styles.skillPercent}>{item.level}%</Text>
      </View>
      <View style={styles.skillBarBg}>
        <View style={[styles.skillBarFill, { width: `${item.level}%` }]} />
      </View>
    </View>
  );

  const renderContact = ({ item }) => (
    <View style={styles.contactRow}>
      <View style={[styles.contactIconWrap, { backgroundColor: item.color + '18' }]}>
        <Ionicons name={item.iconName} size={18} color={item.color} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>{item.label}</Text>
        <Text style={styles.contactSub}>{item.sub}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={14} color="#cbd5e1" />
    </View>
  );

  const renderEducation = ({ item }) => (
    <View style={styles.contactRow}>
      <View style={[styles.contactIconWrap, { backgroundColor: '#eef2ff' }]}>
        <Ionicons name={item.iconName} size={18} color="#6366f1" />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>{item.label}</Text>
        <Text style={styles.contactSub}>{item.sub}</Text>
      </View>
    </View>
  );

  const renderTab = ({ item }) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === item && styles.tabActive]}
      onPress={() => setActiveTab(item)}
    >
      <Text style={[styles.tabText, activeTab === item && styles.tabTextActive]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  // Tab content switcher

  const TabContent = () => {
    if (activeTab === 'About') {
      return (
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="person-outline" size={16} color="#6366f1" />
            <Text style={styles.cardTitle}>About Me</Text>
          </View>
          <Text style={styles.bodyText}>
            A passionate developer who loves building beautiful and functional mobile
            applications. Currently exploring React Native and modern UI patterns at the
            Royal University of Bhutan.
          </Text>
          <View style={styles.divider} />
          <View style={styles.cardTitleRow}>
            <Ionicons name="school-outline" size={16} color="#6366f1" />
            <Text style={styles.cardTitle}>Education</Text>
          </View>
          <FlatList
            data={EDUCATION}
            keyExtractor={(item) => item.id}
            renderItem={renderEducation}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      );
    }

    if (activeTab === 'Skills') {
      return (
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="flash-outline" size={16} color="#6366f1" />
            <Text style={styles.cardTitle}>Technical Skills</Text>
          </View>
          <FlatList
            data={SKILLS}
            keyExtractor={(item) => item.id}
            renderItem={renderSkill}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </View>
      );
    }

    if (activeTab === 'Contact') {
      return (
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="call-outline" size={16} color="#6366f1" />
            <Text style={styles.cardTitle}>Get In Touch</Text>
          </View>
          <FlatList
            data={CONTACT_INFO}
            keyExtractor={(item) => item.id}
            renderItem={renderContact}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      );
    }

    return null;
  };

  // Header: profile hero

  const ProfileHero = () => (
    <View style={[styles.heroRow, isWide ? styles.heroRowWide : styles.heroRowNarrow]}>
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>JS</Text>
        </View>
        <View style={styles.onlineDot} />
      </View>

      {/* Info */}
      <View style={[styles.heroInfo, isWide && styles.heroInfoWide]}>
        <Text style={styles.profileName}>Jigden Shakya</Text>
        <View style={styles.roleRow}>
          <Ionicons name="code-slash-outline" size={13} color="#94a3b8" />
          <Text style={styles.profileRole}>Software Engineering Student</Text>
        </View>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Ionicons name="location-outline" size={11} color="#94a3b8" />
            <Text style={styles.badgeText}>Rinchending, Phuentsholing</Text>
          </View>
          <View style={[styles.badge, styles.badgeGreen]}>
            <Ionicons name="ellipse" size={8} color="#22c55e" />
            <Text style={[styles.badgeText, { color: '#22c55e' }]}>Open to work</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Tab bar as FlatList

  const TabBar = () => (
    <FlatList
      data={TABS}
      keyExtractor={(item) => item}
      renderItem={renderTab}
      horizontal
      scrollEnabled={false}
      style={styles.tabBarContainer}
      contentContainerStyle={[styles.tabBar, isWide ? styles.tabBarWide : styles.tabBarNarrow]}
    />
  );

  // Root FlatList

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={[{ id: 'content' }]}
      keyExtractor={(item) => item.id}
      renderItem={() => <TabContent />}
      ListHeaderComponent={
        <>
          <ProfileHero />
          <TabBar />
        </>
      }
      ListFooterComponent={
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Ionicons name="arrow-back-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.backButtonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

// Styles 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },

  // Hero
  heroRow: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 24,
    marginBottom: 16,
  },
  heroRowNarrow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroRowWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff22',
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  heroInfo: {
    alignItems: 'center',
  },
  heroInfoWide: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 6,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  profileRole: {
    fontSize: 13,
    color: '#94a3b8',
    marginLeft: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeGreen: {
    backgroundColor: '#14532d33',
  },
  badgeText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '500',
  },

  // Tab bar
  tabBarContainer: {
    marginBottom: 16,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
  },
  tabBarWide: {
    justifyContent: 'flex-start',
  },
  tabBarNarrow: {
    justifyContent: 'center',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    minWidth: 80,
  },
  tabActive: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#ffffff',
  },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bodyText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 2,
  },

  // Skill bars
  skillRow: {
    paddingVertical: 4,
  },
  skillLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
  },
  skillPercent: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '700',
  },
  skillBarBg: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },

  // Contact rows
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
  },
  contactSub: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },

  /* Back button */
  backButton: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  debugLabel: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 11,
    color: '#94a3b8',
  },
});