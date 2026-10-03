import { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import type { UserRole } from "@loetogo/domain";

const roles: UserRole[] = ["client","driver","restaurant","admin"];
const labels: Record<UserRole,string[]> = {
  client:["Home","Search","Orders","Profile"],
  driver:["Home","Offers","Earnings","Profile"],
  restaurant:["Home","Orders","Menu","Profile"],
  admin:["Overview","Orders","Partners","Account"]
};

const clientRestaurants = [
  {name:"Mokolodi Kitchen",meta:"Setswana · Grill",eta:"28 min",fee:"P18"},
  {name:"Urban Bowl",meta:"Healthy · Wraps",eta:"24 min",fee:"P15"},
  {name:"Kgale Pizza Co.",meta:"Pizza · Fast food",eta:"35 min",fee:"P20"}
];

const driverOffers = [
  {route:"Main Mall → Block 8",restaurant:"Mokolodi Kitchen",meta:"6.4 km · ~23 min",pay:"P42"},
  {route:"CBD → Village",restaurant:"Urban Bowl",meta:"4.1 km · ~18 min",pay:"P34"}
];

const restaurantOrders = [
  {id:"LG-1042",customer:"Naledi",items:"2× Seswaa Bowl · 1× Coke",status:"Placed"},
  {id:"LG-1041",customer:"Kabelo",items:"1× Grilled Chicken Plate",status:"Preparing"}
];

function ChipGroup({values,onToggle}:{values:string[];onToggle:(value:string)=>void}) {
  const choices=["Fast delivery","Cash","Mobile money","Scheduled","Local food","Top rated"];
  return <View style={styles.chipRow}>{choices.map(choice=>{
    const selected=values.includes(choice);
    return <TouchableOpacity key={choice} onPress={()=>onToggle(choice)} style={[styles.chip,selected&&styles.chipActive]}>
      <Text style={[styles.chipText,selected&&styles.chipTextActive]}>{choice}</Text>
    </TouchableOpacity>;
  })}</View>;
}

function ClientHome() {
  const [filters,setFilters]=useState(["Fast delivery"]);
  const toggle=(v:string)=>setFilters(items=>items.includes(v)?items.filter(x=>x!==v):[...items,v]);
  return <>
    <View style={styles.sectionHeader}><Text style={styles.eyebrow}>DELIVER TO</Text><Text style={styles.sectionTitle}>Home · Gaborone</Text></View>
    <ChipGroup values={filters} onToggle={toggle}/>
    <Text style={styles.sectionTitle}>Restaurants near you</Text>
    {clientRestaurants.map(item=><View key={item.name} style={styles.card}>
      <View style={styles.imagePlaceholder}><Text style={styles.imageBadge}>{item.eta}</Text></View>
      <Text style={styles.cardTitle}>{item.name}</Text><Text style={styles.cardCopy}>{item.meta}</Text>
      <View style={styles.rowBetween}><Text style={styles.smallStrong}>★ 4.8</Text><Text style={styles.smallStrong}>{item.fee} delivery</Text></View>
    </View>)}
  </>;
}

function DriverHome() {
  const [online,setOnline]=useState(false);
  const [accepted,setAccepted]=useState<string|null>(null);
  return <>
    <View style={styles.card}>
      <View style={styles.rowBetween}><View><Text style={styles.eyebrow}>DRIVER STATUS</Text><Text style={styles.cardTitle}>{online?"You're online":"You're offline"}</Text></View>
      <TouchableOpacity onPress={()=>setOnline(v=>!v)} style={[styles.action,online&&styles.actionSuccess]}><Text style={styles.actionText}>{online?"Go offline":"Go online"}</Text></TouchableOpacity></View>
    </View>
    <Text style={styles.sectionTitle}>Delivery offers</Text>
    {driverOffers.map(item=><View key={item.route} style={styles.card}>
      <Text style={styles.cardCopy}>{item.restaurant}</Text><Text style={styles.cardTitle}>{item.route}</Text><Text style={styles.cardCopy}>{item.meta}</Text>
      <View style={[styles.rowBetween,{marginTop:16}]}><View><Text style={styles.eyebrow}>YOU EARN</Text><Text style={styles.pay}>{item.pay}</Text></View>
      <TouchableOpacity onPress={()=>setAccepted(item.route)} style={styles.action}><Text style={styles.actionText}>Accept</Text></TouchableOpacity></View>
    </View>)}
    {accepted&&<View style={styles.successCard}><Text style={styles.eyebrow}>ACTIVE DELIVERY</Text><Text style={styles.cardTitle}>{accepted}</Text></View>}
  </>;
}

function RestaurantHome() {
  const [cuisines,setCuisines]=useState(["Local food"]);
  const toggle=(v:string)=>setCuisines(items=>items.includes(v)?items.filter(x=>x!==v):[...items,v]);
  return <>
    <Text style={styles.sectionTitle}>Kitchen queue</Text>
    {restaurantOrders.map(item=><View key={item.id} style={styles.card}>
      <View style={styles.rowBetween}><Text style={styles.cardCopy}>{item.id} · {item.customer}</Text><Text style={styles.status}>{item.status}</Text></View>
      <Text style={styles.cardTitle}>{item.items}</Text>
      <View style={styles.chipRow}><TouchableOpacity style={styles.outlineAction}><Text>Accept</Text></TouchableOpacity><TouchableOpacity style={styles.outlineAction}><Text>Preparing</Text></TouchableOpacity><TouchableOpacity style={styles.outlineAction}><Text>Ready</Text></TouchableOpacity></View>
    </View>)}
    <View style={styles.card}><Text style={styles.cardTitle}>Store setup</Text><Text style={styles.cardCopy}>Tap common options instead of typing them repeatedly.</Text><ChipGroup values={cuisines} onToggle={toggle}/></View>
  </>;
}

function AdminHome() {
  const stats=[["Live orders","18"],["Drivers online","31"],["Restaurants","44"],["Issues","3"]];
  return <>
    <View style={styles.statsGrid}>{stats.map(([label,value])=><View key={label} style={styles.statCard}><Text style={styles.cardCopy}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>)}</View>
    <Text style={styles.sectionTitle}>Marketplace operations</Text>
    {[
      ["LG-1042","Mokolodi Kitchen","Preparing","P176"],
      ["LG-1043","Urban Bowl","Assigned","P118"],
      ["LG-1044","Kgale Pizza Co.","Placed","P242"]
    ].map(row=><View key={row[0]} style={styles.card}><View style={styles.rowBetween}><Text style={styles.smallStrong}>{row[0]}</Text><Text style={styles.smallStrong}>{row[3]}</Text></View><Text style={styles.cardTitle}>{row[1]}</Text><Text style={styles.cardCopy}>{row[2]}</Text></View>)}
  </>;
}

export default function App() {
  const [role,setRole]=useState<UserRole>("client");
  const [active,setActive]=useState(labels.client[0]);
  const nav=useMemo(()=>labels[role],[role]);

  const changeRole=(next:UserRole)=>{setRole(next);setActive(labels[next][0]);};
  const content=role==="client"?<ClientHome/>:role==="driver"?<DriverHome/>:role==="restaurant"?<RestaurantHome/>:<AdminHome/>;

  return <SafeAreaView style={styles.safe}>
    <StatusBar style="dark"/>
    <View style={styles.header}><View><Text style={styles.brand}>Loeto Go</Text><Text style={styles.muted}>Botswana moves with you</Text></View></View>
    <ScrollView contentContainerStyle={styles.content}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.roleRow}>
        {roles.map(item=><TouchableOpacity key={item} onPress={()=>changeRole(item)} style={[styles.rolePill,role===item&&styles.rolePillActive]}><Text style={[styles.roleText,role===item&&styles.roleTextActive]}>{item}</Text></TouchableOpacity>)}
      </ScrollView>
      <View style={styles.hero}><Text style={styles.heroEyebrow}>{role.toUpperCase()} · {active.toUpperCase()}</Text><Text style={styles.heroTitle}>{role==="client"?"What can we bring you?":role==="driver"?"Ready to earn?":role==="restaurant"?"Run your store":"Operations"}</Text></View>
      <View style={{gap:14,marginTop:18}}>{content}</View>
    </ScrollView>

    <View style={styles.bottomNav}>
      {nav.map((item,index)=>{
        const focused=active===item;
        const icons=["home-outline","search-outline","receipt-outline","person-outline"] as const;
        return <TouchableOpacity key={item} onPress={()=>setActive(item)} style={styles.navItem}><Ionicons name={icons[index]} size={24} color={focused?"#2563eb":"#94a3b8"}/><Text style={[styles.navText,focused&&styles.navTextActive]}>{item}</Text></TouchableOpacity>;
      })}
    </View>
  </SafeAreaView>;
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:"#f5f9ff"},
  header:{paddingHorizontal:20,paddingTop:8,paddingBottom:12,backgroundColor:"#fff"},
  brand:{fontSize:22,fontWeight:"900",color:"#1e3a8a"},
  muted:{marginTop:2,fontSize:12,color:"#64748b"},
  content:{padding:20,paddingBottom:120},
  roleRow:{gap:8,paddingBottom:18},
  rolePill:{paddingHorizontal:16,paddingVertical:10,borderRadius:999,backgroundColor:"#fff"},
  rolePillActive:{backgroundColor:"#2563eb"},
  roleText:{textTransform:"capitalize",color:"#334155",fontWeight:"700"},
  roleTextActive:{color:"#fff"},
  hero:{backgroundColor:"#2563eb",borderRadius:28,padding:24,minHeight:210,justifyContent:"flex-end"},
  heroEyebrow:{color:"#94a3b8",fontSize:12,fontWeight:"800",letterSpacing:1.2},
  heroTitle:{color:"#fff",fontSize:38,fontWeight:"900",marginTop:8},
  sectionHeader:{marginBottom:2},
  sectionTitle:{fontSize:22,fontWeight:"900",color:"#1e3a8a",marginBottom:8},
  eyebrow:{color:"#64748b",fontSize:11,fontWeight:"800",letterSpacing:.8},
  card:{backgroundColor:"#fff",borderRadius:24,padding:18},
  cardTitle:{color:"#1e3a8a",fontSize:18,fontWeight:"800",marginTop:5},
  cardCopy:{color:"#64748b",marginTop:5,lineHeight:20},
  imagePlaceholder:{height:128,borderRadius:18,backgroundColor:"#e2e8f0",padding:12,marginBottom:14},
  imageBadge:{alignSelf:"flex-start",backgroundColor:"#fff",paddingHorizontal:10,paddingVertical:6,borderRadius:999,fontSize:11,fontWeight:"800"},
  rowBetween:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:12},
  smallStrong:{fontSize:12,fontWeight:"800",color:"#1e3a8a"},
  pay:{fontSize:27,fontWeight:"900",color:"#1e3a8a",marginTop:2},
  action:{backgroundColor:"#2563eb",paddingHorizontal:18,paddingVertical:12,borderRadius:999},
  actionSuccess:{backgroundColor:"#059669"},
  actionText:{color:"#fff",fontWeight:"800"},
  successCard:{backgroundColor:"#d1fae5",borderRadius:24,padding:18},
  outlineAction:{borderWidth:1,borderColor:"#e2e8f0",borderRadius:999,paddingHorizontal:13,paddingVertical:9},
  status:{backgroundColor:"#f1f5f9",borderRadius:999,paddingHorizontal:10,paddingVertical:6,fontSize:11,fontWeight:"800"},
  chipRow:{flexDirection:"row",flexWrap:"wrap",gap:8,marginTop:10,marginBottom:8},
  chip:{backgroundColor:"#fff",borderWidth:1,borderColor:"#e2e8f0",paddingHorizontal:13,paddingVertical:9,borderRadius:999},
  chipActive:{backgroundColor:"#2563eb",borderColor:"#0f172a"},
  chipText:{fontSize:12,fontWeight:"700",color:"#334155"},
  chipTextActive:{color:"#fff"},
  statsGrid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  statCard:{width:"48%",backgroundColor:"#fff",borderRadius:20,padding:16},
  statValue:{fontSize:28,fontWeight:"900",color:"#1e3a8a",marginTop:4},
  bottomNav:{position:"absolute",left:0,right:0,bottom:0,flexDirection:"row",paddingTop:10,paddingBottom:18,backgroundColor:"rgba(255,255,255,.97)",borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:"#e2e8f0"},
  navItem:{flex:1,alignItems:"center",gap:4},
  navText:{fontSize:10,fontWeight:"700",color:"#94a3b8"},
  navTextActive:{color:"#1e3a8a"}
});
