import { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import type { UserRole } from "@loetogo/domain";

const roles: UserRole[] = ["client", "driver", "restaurant", "admin"];
const labels: Record<UserRole, string[]> = {
  client: ["Home", "Search", "Orders", "Profile"],
  driver: ["Home", "Offers", "Earnings", "Profile"],
  restaurant: ["Home", "Orders", "Menu", "Profile"],
  admin: ["Overview", "Orders", "Partners", "Account"]
};

export default function App() {
  const [role, setRole] = useState<UserRole>("client");
  const [active, setActive] = useState(labels.client[0]);
  const nav = useMemo(() => labels[role], [role]);

  const changeRole = (next: UserRole) => {
    setRole(next);
    setActive(labels[next][0]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>Loeto Go</Text>
          <Text style={styles.muted}>Botswana moves with you</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.roleRow}>
          {roles.map(item => (
            <TouchableOpacity key={item} onPress={() => changeRole(item)}
              style={[styles.rolePill, role === item && styles.rolePillActive]}>
              <Text style={[styles.roleText, role === item && styles.roleTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>{role.toUpperCase()}</Text>
          <Text style={styles.heroTitle}>{active}</Text>
          <Text style={styles.heroCopy}>Native shell ready for role-specific Loeto Go workflows and local-first state.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Local-first today</Text>
          <Text style={styles.cardCopy}>Persistent adapters will later connect Google OAuth and Drive without changing role screens.</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {nav.map((item, index) => {
          const focused = active === item;
          const icons = ["home-outline", "search-outline", "receipt-outline", "person-outline"] as const;
          return (
            <TouchableOpacity key={item} onPress={() => setActive(item)} style={styles.navItem}>
              <Ionicons name={icons[index]} size={24} color={focused ? "#0f172a" : "#94a3b8"} />
              <Text style={[styles.navText, focused && styles.navTextActive]}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f8fa" },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12, backgroundColor: "#fff" },
  brand: { fontSize: 22, fontWeight: "900", color: "#0f172a" },
  muted: { marginTop: 2, fontSize: 12, color: "#64748b" },
  content: { padding: 20, paddingBottom: 110 },
  roleRow: { gap: 8, paddingBottom: 18 },
  rolePill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, backgroundColor: "#fff" },
  rolePillActive: { backgroundColor: "#0f172a" },
  roleText: { textTransform: "capitalize", color: "#334155", fontWeight: "700" },
  roleTextActive: { color: "#fff" },
  hero: { backgroundColor: "#0f172a", borderRadius: 28, padding: 24, minHeight: 260, justifyContent: "flex-end" },
  heroEyebrow: { color: "#94a3b8", fontSize: 12, fontWeight: "800", letterSpacing: 1.2 },
  heroTitle: { color: "#fff", fontSize: 44, fontWeight: "900", marginTop: 8 },
  heroCopy: { color: "#cbd5e1", fontSize: 15, lineHeight: 22, marginTop: 10 },
  card: { marginTop: 18, backgroundColor: "#fff", borderRadius: 24, padding: 20 },
  cardTitle: { color: "#0f172a", fontSize: 18, fontWeight: "800" },
  cardCopy: { color: "#64748b", marginTop: 8, lineHeight: 21 },
  bottomNav: { position: "absolute", left: 0, right: 0, bottom: 0, flexDirection: "row", paddingTop: 10, paddingBottom: 18, backgroundColor: "rgba(255,255,255,.97)", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#e2e8f0" },
  navItem: { flex: 1, alignItems: "center", gap: 4 },
  navText: { fontSize: 10, fontWeight: "700", color: "#94a3b8" },
  navTextActive: { color: "#0f172a" }
});
