import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '../components/StatCard';

// Data

const STATS = [
  { id: '1', label: 'Projects',     value: '12', iconName: 'folder-open-outline' },
  { id: '2', label: 'Tasks Done',   value: '84', iconName: 'checkmark-circle-outline' },
  { id: '3', label: 'Hours Logged', value: '320', iconName: 'time-outline' },
  { id: '4', label: 'Team Members', value: '5',  iconName: 'people-outline' },
];

const TASKS = [
  { id: '1', text: 'Fix login bug',        iconName: 'bug-outline' },
  { id: '2', text: 'Write unit tests',     iconName: 'flask-outline' },
  { id: '3', text: 'Update README',        iconName: 'document-text-outline' },
  { id: '4', text: 'Deploy to staging',    iconName: 'cloud-upload-outline' },
  { id: '5', text: 'Review pull requests', iconName: 'git-pull-request-outline' },
];

const NOTIFICATIONS = [
  { id: '1', text: 'Build succeeded',        iconName: 'checkmark-done-circle-outline', color: '#22c55e' },
  { id: '2', text: 'New comment on PR #42',  iconName: 'chatbubble-ellipses-outline',   color: '#3b82f6' },
  { id: '3', text: 'v2.1.0 released',        iconName: 'rocket-outline',                color: '#f59e0b' },
  { id: '4', text: 'Server load high',       iconName: 'warning-outline',               color: '#ef4444' },
];

// Component 

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  // Render helpers for FlatList items

  const renderStatCard = ({ item }) => (
    <StatCard
      iconName={item.iconName}
      value={item.value}
      label={item.label}
      isWide={isWide}
      screenWidth={width}
    />
  );

  const renderTask = ({ item, index }) => (
    <View style={styles.taskRow}>
      <View style={styles.taskIconWrap}>
        <Ionicons name={item.iconName} size={16} color="#6366f1" />
      </View>
      <Text style={styles.taskText}>{item.text}</Text>
      <Ionicons name="chevron-forward-outline" size={14} color="#94a3b8" />
    </View>
  );

  const renderNotification = ({ item }) => (
    <View style={styles.noteRow}>
      <Ionicons name={item.iconName} size={18} color={item.color} style={styles.noteIcon} />
      <Text style={styles.noteText}>{item.text}</Text>
    </View>
  );

  // Two-panel section (tasks + notifications)
  // On narrow screens these stack; on wide screens they sit side by side.
  const PanelSection = () => (
    <View style={[styles.panelRow, isWide ? styles.panelRowWide : styles.panelRowNarrow]}>
      {/* Tasks panel */}
      <View style={[styles.panel, styles.panelLeft, isWide && styles.panelHalf]}>
        <View style={styles.panelHeader}>
          <Ionicons name="list-outline" size={18} color="#6366f1" />
          <Text style={styles.panelHeading}>Recent Tasks</Text>
        </View>
        <FlatList
          data={TASKS}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          scrollEnabled={false}          // parent ScrollView handles scrolling
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      {/* Notifications panel */}
      <View style={[styles.panel, styles.panelRight, isWide && styles.panelHalf]}>
        <View style={styles.panelHeader}>
          <Ionicons name="notifications-outline" size={18} color="#f59e0b" />
          <Text style={styles.panelHeading}>Notifications</Text>
        </View>
        <FlatList
          data={NOTIFICATIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );

  // Main screen uses FlatList as the root scroller
  // We pass everything as ListHeaderComponent / ListFooterComponent
  // so the stats grid FlatList (horizontal) is also inside one scroll tree.

  const Header = () => (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Banner */}
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>Good Morning</Text>
          <Text style={styles.bannerSubtitle}>Here is what is happening today</Text>
        </View>
        <View style={styles.bannerIconWrap}>
          <Ionicons name="sunny-outline" size={32} color="#fbbf24" />
        </View>
      </View>

      {/* Stats — horizontal FlatList */}
      <View style={styles.sectionRow}>
        <Ionicons name="bar-chart-outline" size={15} color="#6366f1" />
        <Text style={styles.sectionTitle}>Overview</Text>
      </View>
      <FlatList
        data={STATS}
        keyExtractor={(item) => item.id}
        renderItem={renderStatCard}
        horizontal={!isWide}           // horizontal scroll on phones
        numColumns={isWide ? 4 : 1}    // 4-col grid on tablets
        key={isWide ? 'grid' : 'list'} // force remount when numColumns changes
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsList}
        columnWrapperStyle={isWide && styles.statsColumnWrapper}
        style={styles.statsListContainer}
      />

      {/* Activity heading */}
      <View style={styles.sectionRow}>
        <Ionicons name="pulse-outline" size={15} color="#6366f1" />
        <Text style={styles.sectionTitle}>Activity</Text>
      </View>
    </>
  );

  const Footer = () => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Profile')}
      activeOpacity={0.85}
    >
      <Ionicons name="person-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
      <Text style={styles.buttonText}>View My Profile</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={[{ id: 'panels' }]}           // single item — the two-panel section
      keyExtractor={(item) => item.id}
      renderItem={() => <PanelSection />}
      ListHeaderComponent={<Header />}
      ListFooterComponent={<Footer />}
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

// Banner 
  banner: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
  },
  bannerIconWrap: {
    backgroundColor: '#1e293b',
    borderRadius: 50,
    padding: 12,
  },

  // Section heading
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Stats FlatList
  statsListContainer: {
    marginBottom: 24,
  },
  statsList: {
    gap: 12,
    paddingRight: 4,
  },
  statsColumnWrapper: {
    gap: 12,
  },

  // Two-panel row 
  panelRow: {
    marginBottom: 24,
  },
  panelRowNarrow: {
    flexDirection: 'column',
  },
  panelRowWide: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  panelHalf: {
    flex: 1,
    marginBottom: 0,
  },
  panelLeft: {
    borderTopWidth: 3,
    borderTopColor: '#6366f1',
  },
  panelRight: {
    borderTopWidth: 3,
    borderTopColor: '#f59e0b',
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  panelHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 8,
  },

  // Task row
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  taskIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },

  // Notification row
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  noteIcon: {
    marginRight: 12,
  },
  noteText: {
    fontSize: 13,
    color: '#334155',
    flex: 1,
    fontWeight: '500',
  },

  // Separator
  separator: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },

  // CTA button
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});